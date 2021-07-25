<template>
  <q-layout view="lHh Lpr lff" class="shadow-2 rounded-borders">
    <div class="q-pa-md relative-position">
      <q-btn label="点击登陆" @click="login" class="fixed-center" />
    </div>

    <q-dialog v-model="showErrorDialog" position="top">
      <q-card class="dialog-tip">
        <q-card-section>
          <div class="row justify-center">
            <q-icon></q-icon>
            <label>{{ showErrorMessage }}</label>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { onMounted, reactive, ref } from 'vue';
import Client, { CLIENT_EVENTS } from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import { AppMetadata, PairingTypes, SessionTypes } from '@walletconnect/types';
import { ERROR } from '@walletconnect/utils';
import { useQuasar } from 'quasar';
import {
  DEFAULT_METHODS,
  DEFAULT_RELAY_PROVIDER,
  AppState,
  INITIAL_STATE,
} from 'src/utils';

import { useRouter } from 'vue-router';
import { eventHub } from 'src/boot/booting-misc';
import WalletSelectDialog from 'src/components/WalletSelectDialog.vue';
import { StateInterface } from 'src/store';
import { useStore } from 'vuex';
import { init } from 'src/utils/fullscreen';
import { backServerUrl } from 'src/utils/index';
import axios from 'axios';
import useWalletConnect from 'src/hooks/useWalletConnect';
import Message from 'bsv/message';
import { LocalStorage, SessionStorage } from 'quasar';

// 服务器验证权限
function checkAdminAddress(address: string) {
  console.log('Amence checkAdminAddress', address);
  return axios
    .get(backServerUrl + '/v1/checkAdmin', { params: { name: address } })
    .then(function (response) {
      return response.data.success;
    })
    .catch(function (error) {
      return false;
    });
}

// 清空session
async function resetApp(store, data) {
  await data.client?.disconnect({
    topic: data.session.topic,
    reason: ERROR.USER_DISCONNECTED.format(),
  });
  const { resetConnect } = useWalletConnect(false);
  resetConnect();
  store.dispatch('setAccount', undefined);
  data.session = undefined;
  data.accounts = [];
  data.client = undefined;
  // TODO 清除localstorage
  LocalStorage.clear();
}

async function startLogin(router, data, store) {
  const accountName = data.accounts[0].split('@')[0].split('||')[0];
  store.dispatch('setAccount', { accountName: accountName });
  const { dataWC } = useWalletConnect(false);
  dataWC.accounts = data.accounts;
  dataWC.client = data.client;
  dataWC.session = data.session;
  // 进入首页
  router.push({ path: '/index' });
}

// 已经建立链接
async function onSessiconnected(data, session: SessionTypes.Settled) {
  data.session = session;
  data.accounts = session.state.accounts;
  const singoutAarry = data.accounts[0].split('|');
  const address = singoutAarry[singoutAarry.length - 1].split('@')[0];
  const checkAddressResult = await checkAdminAddress(address);
  if (checkAddressResult) {
    eventHub.$emit('sign', address);
  } else {
    eventHub.$emit('addressFailed', address);
  }
}
// 验证签名
function verifySign(signData: string, address: string, result: any): boolean {
  return Message.verify(signData, address, result.signature);
}

export default {
  name: 'LoginLayout',
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const store = useStore<StateInterface>();
    const data = reactive<AppState>(Object.assign({}, INITIAL_STATE));
    const showErrorDialog = ref(false);
    const showErrorMessage = ref('请使用管理员钱包');

    // 请求登陆
    const login = async () => {
      data.client = await Client.init({
        relayProvider: DEFAULT_RELAY_PROVIDER,
      });
      subscribeToEvents();
      init();
      await checkPersistedState();
      const app = <AppMetadata>{
        name: 'ChainBow Admin',
        description: 'ChainBow Admin',
        url: 'http://back.chainbow.io',
        icons: ['http://121.43.41.7/images/admin.png'],
      };
      eventHub.$emit('connect', app);
    };

    // 开始请求链接
    eventHub.$on('connect', async (metadata: AppMetadata) => {
      // 稍作延迟 等待监听启动
      setTimeout(async () => {
        if (data.accounts.length === 0 && !store.state.account) {
          $q.dialog({
            component: WalletSelectDialog,
          }).onOk(async (selectedWalletName: string) => {
            if (selectedWalletName === 'WalletConnect') {
              connect(metadata);
            }
          });
        }
      }, 500);
    });

    // 开建立链接
    const connect = async (metadata: AppMetadata) => {
      try {
        const session = await data.client!.connect({
          metadata: metadata,
          pairing: undefined,
          permissions: {
            blockchain: { chains: ['bsv:livenet'] },
            jsonrpc: { methods: Object.values(DEFAULT_METHODS) },
          },
        });
        onSessiconnected(data, session);
      } catch (e) {
        // ignore rejection
      }
      QRCodeModal.close();
    };

    const subscribeToEvents = () => {
      data.client!.on(
        CLIENT_EVENTS.pairing.proposal,
        async (proposal: PairingTypes.Proposal) => {
          const { uri } = proposal.signal.params;
          console.log('EVENT', 'QR Code Modal open');
          QRCodeModal.open(uri, () => {}, { mobileLinks: ['chainbow'] });
        }
      );
      data.client!.on(
        CLIENT_EVENTS.session.deleted,
        (session: SessionTypes.Settled) => {
          console.log('ACTION LoginLayout', 'disconnect');
          if (!store.state.account) { return;}
          console.log('ACTION LoginLayout 依然存在账号', store.state.account);
          if (session.topic !== data.session?.topic) return;
          // 退出到登陆
          resetApp(store, data);
          router.push({ path: '/' });
        }
      );
    };

    // 检查账号是否再缓存
    const checkPersistedState = async () => {
      if (!store.state.account) {
        return;
      }
      if (typeof data.client === 'undefined') {
        throw new Error('WalletConnect is not initialized');
      }
      if (data.client.session.topics.length) {
        const session = await data.client.session.get(
          data.client.session.topics[0]
        );
        data.accounts = session.state.accounts;
        onSessiconnected(data, session);
      }
    };

    // 开始签名
    eventHub.$on('sign', async (address: string) => {
      try {
        // 这里记录签名的data
        data.signData = String(Date.parse(new Date().toString()));
        const result = await data.client!.request({
          topic: data.session!.topic,
          chainId: 'bsv:livenet',
          request: { method: 'sign', params: data.signData },
        });
        // 开始验证签名
        if (verifySign(data.signData, address, result)) {
          showErrorDialog.value = false;
          eventHub.$emit('signSucess');
        } else {
          showErrorDialog.value = true;
          showErrorMessage.value = '签名失败，无法登陆';
          eventHub.$emit('disconnect');
        }
      } catch (error) {
        // console.error(error);  
        return {};
      }
      // 开始登陆
    });

    eventHub.$on('addressFailed', () => {
      showErrorDialog.value = true;
      showErrorMessage.value = '请使用管理员钱包登陆';
      resetApp(store, data);
    });
    // 签名完成开始登陆
    eventHub.$on('signSucess', () => {
      startLogin(router, data, store);
    });

    // 断开链接
    eventHub.$on('disconnect', () => resetApp(store, data));

    eventHub.$on('connected', (account) => {});
    return { login, showErrorDialog, showErrorMessage };
  },
};
</script>

<style scoped>
.dialog-tip {
  width: 25rem;
  color: red;
  font-size: 1rem;
  font-weight: bold;
}
</style>
