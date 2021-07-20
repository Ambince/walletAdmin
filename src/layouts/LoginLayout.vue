<template>
  <q-layout view="lHh Lpr lff" class="shadow-2 rounded-borders">
    <div class="q-pa-md relative-position">
      <q-btn label="点击登陆" @click="login" class="fixed-center" />
    </div>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { onMounted, reactive, ref } from "vue";
import Client, { CLIENT_EVENTS } from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { AppMetadata, PairingTypes, SessionTypes } from "@walletconnect/types";
import { ERROR } from "@walletconnect/utils";

import { useQuasar } from "quasar";

import {
  DEFAULT_METHODS,
  DEFAULT_RELAY_PROVIDER,
  AppState,
  INITIAL_STATE,
} from "src/utils";

import { useRouter } from "vue-router";
import { eventHub } from "src/boot/booting-misc";
import WalletSelectDialog from "src/components/WalletSelectDialog.vue";
import { StateInterface } from "src/store";
import { useStore } from "vuex";
import { init } from "src/utils/fullscreen";
import { backServerUrl } from "src/utils/index";
import axios from "axios";
import useWalletConnect from "src/hooks/useWalletConnect";

// 服务器验证权限
function checkAdmin(accountName: string) {
  return axios
    .get(backServerUrl + "/v1/checkAdmin", {
      params: { name: accountName },
    })
    .then(function (response) {
      return response.data.success;
    })
    .catch(function (error) {
      return false;
    });
}

// 清空session
async function resetApp(store, data) {
  const { resetConnect } = useWalletConnect(false);
  resetConnect();
  store.dispatch("setAccount", undefined);
  data.session = undefined;
  data.accounts = [];
  data.client = undefined;
}

async function checkOrSaveAccount(router, data, store) {
  const accountName = data.accounts[0].split("@")[0].split("||")[0];
  // 服务器检查用户权限
  const checked = await checkAdmin(accountName);
  // if (!checked) {
  //   // TODO提示用户没有权限
  //   resetApp();
  //   login();
  //   return;
  // }
  store.dispatch("setAccount", { accountName: accountName });
  const { dataWC } = useWalletConnect(false);
  dataWC.accounts = data.accounts;
  dataWC.client = data.client;
  dataWC.session = data.session;
  // 进入首页
  router.push({ path: "/index" });
}

// 已经建立链接
async function onSessiconnected(data, session: SessionTypes.Settled) {
  data.session = session;
  data.accounts = session.state.accounts;
  eventHub.$emit("connected", data.accounts[0].split("@")[0]);
}

export default {
  name: "LoginLayout",
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const store = useStore<StateInterface>();
    const data = reactive<AppState>(Object.assign({}, INITIAL_STATE));

    // 登陆出发connect
    const login = async () => {
      data.client = await Client.init({
        relayProvider: DEFAULT_RELAY_PROVIDER,
      });
      subscribeToEvents();
      init();
      await checkPersistedState();
      const app = <AppMetadata>{
        name: "ChainBow Admin",
        description: "ChainBow Admin",
        url: "http://back.chainbow.io",
        icons: ["http://121.43.41.7/images/admin.png"],
      };
      eventHub.$emit("connect", app);
    };

    // 开建立链接
    const connect = async (metadata: AppMetadata) => {
      try {
        const session = await data.client!.connect({
          metadata: metadata,
          pairing: undefined,
          permissions: {
            blockchain: {
              chains: ["bsv:livenet"],
            },
            jsonrpc: {
              methods: Object.values(DEFAULT_METHODS),
            },
          },
        });
        onSessiconnected(data, session);
        checkOrSaveAccount(router, data, store);
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
          console.log("EVENT", "QR Code Modal open");
          QRCodeModal.open(
            uri,
            () => {
              console.log("EVENT", "QR Code Modal closed");
            },
            {
              mobileLinks: ["chainbow"],
            }
          );
        }
      );
      data.client!.on(
        CLIENT_EVENTS.session.deleted,
        (session: SessionTypes.Settled) => {
          if (session.topic !== data.session?.topic) return;
          // 退出到登陆
          resetApp(store,data);
          console.log("Amence logout return index");
          router.push({ path: "/" });
        }
      );
    };

    // 检查账号是否再缓存
    const checkPersistedState = async () => {
      if (!store.state.account) {
        return;
      }
      if (typeof data.client === "undefined") {
        throw new Error("WalletConnect is not initialized");
      }
      if (data.client.session.topics.length) {
        const session = await data.client.session.get(
          data.client.session.topics[0]
        );
        data.accounts = session.state.accounts;
        onSessiconnected(data, session);
        checkOrSaveAccount(router, data, store);
      }
    };

    // 开始请求链接
    eventHub.$on("connect", async (metadata: AppMetadata) => {
      // 稍作延迟 等待监听启动
      setTimeout(async () => {
        if (data.accounts.length === 0 && !store.state.account) {
          $q.dialog({
            component: WalletSelectDialog,
          }).onOk(async (selectedWalletName: string) => {
            if (selectedWalletName === "WalletConnect") {
              connect(metadata);
            }
          });
        }
      }, 500);
    });

    // 断开链接
    eventHub.$on("disconnect", () => resetApp(store, data));

    eventHub.$on("connected", (account) => {
      console.log("Amence connected account", account);
    });
    return { login };
  },
};
</script>
