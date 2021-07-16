<template>
  <div class="q-pa-md relative-position">
    <q-btn label="点击登陆" @click="login" class="fixed-center" />
  </div>
</template>

<script lang="ts">
import { onMounted, reactive } from 'vue';
import Client, { CLIENT_EVENTS } from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import { AppMetadata, PairingTypes, SessionTypes } from '@walletconnect/types';
import { ERROR } from '@walletconnect/utils';

import { useQuasar } from 'quasar';

import {
  CHAIN_ID,
  DEFAULT_METHODS,
  DEFAULT_RELAY_PROVIDER,
  validatePaymail,
} from 'src/utils';

import { useRoute, useRouter } from 'vue-router';
import { eventHub } from 'src/boot/booting-misc';

import WalletSelectDialog from 'src/components/WalletSelectDialog.vue';

import { StateInterface } from 'src/store';
import { useStore } from 'vuex';

import { init } from 'src/utils/fullscreen';
import { backServerUrl } from 'src/utils/index';
import axios from 'axios';

export interface AccountBalances {
  [account: string]: AssetData[];
}

export interface AssetData {
  symbol: string;
  name: string;
  decimals: string;
  contractAddress?: string;
  balance?: string;
}

interface AppState {
  client: Client | undefined;
  session: SessionTypes.Created | undefined;
  accounts: string[];
}

const INITIAL_STATE: AppState = {
  client: undefined,
  session: undefined,
  accounts: [],
};

export default {
  setup() {
    const $q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const store = useStore<StateInterface>();
    const data = reactive<AppState>(Object.assign({}, INITIAL_STATE));
    const subscribeToEvents = () => {
      data.client!.on(
        CLIENT_EVENTS.pairing.proposal,
        async (proposal: PairingTypes.Proposal) => {
          const { uri } = proposal.signal.params;
          console.log('EVENT', 'QR Code Modal open');
          QRCodeModal.open(
            uri,
            () => {
              console.log('EVENT', 'QR Code Modal closed');
            },
            {
              mobileLinks: ['chainbow'],
            }
          );
        }
      );

      data.client!.on(
        CLIENT_EVENTS.session.deleted,
        (session: SessionTypes.Settled) => {
          if (session.topic !== data.session?.topic) return;
          console.log('EVENT', 'session_deleted');
          resetApp();
          // 退出到登陆
          router.push({
            path: '/',
          });
        }
      );
    };
    eventHub.$on('disconnect', () => resetApp());
    // 清空session
    const resetApp = async () => {
      store.dispatch('setAccount', undefined);
      if (data.session) {
        await data.client?.disconnect({
          topic: data.session.topic,
          reason: ERROR.USER_DISCONNECTED.format(),
        });
      }
      data.session = undefined;
      data.accounts = [];
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
        onSessiconnected(session);
      }
    };

    const onSessiconnected = async (session: SessionTypes.Settled) => {
      data.session = session;

      data.accounts = session.state.accounts;
      eventHub.$emit('connected', data.accounts[0].split('@')[0]);
      // 存储登陆的用户
      checkOrSaveAccount(data.accounts[0].split('@')[0].split('||')[0]);
    };

    const checkOrSaveAccount = async (accountName: string) => {
      // 服务器检查用户权限
      const checked = await checkAdmin(accountName);
      if (!checked) {
        // TODO提示用户没有权限
        resetApp();
        login();
        return;
      }

      store.dispatch('setAccount', {
        accountName: accountName,
      });
      // 进入首页
      router.push({
        path: '/index',
      });
    };

    const checkAdmin = (accountName: string) => {
      return axios
        .get(backServerUrl + '/v1/checkAdmin', {
          params: { name: accountName },
        })
        .then(function (response) {
          return response.data.result;
        })
        .catch(function (error) {
          return false;
        });
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

    eventHub.$on('connected', (account) => {
      console.log('Amence connected account', account);
    });

    // 登陆出发connect
    const login = () => {
      const app = <AppMetadata>{
        name: 'ChainBow Admin',
        description: 'ChainBow Admin',
        url: 'http://back.chainbow.io',
        icons: ['http://121.43.41.7/images/admin.png'],
      };
      eventHub.$emit('connect', app);
    };

    // 开建立链接
    const connect = async (metadata: AppMetadata) => {
      try {
        const session = await data.client!.connect({
          metadata: metadata,
          pairing: undefined,
          permissions: {
            blockchain: {
              chains: ['bsv:livenet'],
            },
            jsonrpc: {
              methods: Object.values(DEFAULT_METHODS),
            },
          },
        });

        onSessiconnected(session);
      } catch (e) {
        // ignore rejection
      }
      // close modal in case it was open
      QRCodeModal.close();
    };

    // 初始化socket
    onMounted(async () => {
      store.state.account ? null : resetApp();
      data.client = await Client.init({
        relayProvider: DEFAULT_RELAY_PROVIDER,
      });
      subscribeToEvents();
      init();
      await checkPersistedState();
      login();
    });

    return { login };
  },
};
</script>
