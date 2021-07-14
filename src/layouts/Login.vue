

<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lff" class="shadow-2 rounded-borders">
      <q-btn @click="login">登录</q-btn>
    </q-layout>
  </div>
</template>

<script lang="ts">
import bsv from 'bsv';
import { ref, onMounted, reactive, toRefs, watch } from 'vue';
import Client, { CLIENT_EVENTS } from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import { AppMetadata, PairingTypes, SessionTypes } from '@walletconnect/types';
import { ERROR, getAppMetadata } from '@walletconnect/utils';
import { RequestArguments } from '@json-rpc-tools/types';
import { useQuasar, Notify, LocalStorage } from 'quasar';
import PairingDialog from 'src/components/PairingDialog.vue';
import { CHAIN_ID, DEFAULT_LOGGER, DEFAULT_METHODS, DEFAULT_RELAY_PROVIDER, validatePaymail } from 'src/utils';

import { useRoute ,useRouter} from 'vue-router';
import { eventHub } from 'src/boot/booting-misc';
import { Payment, PaymentParameters } from 'chainbowpay';
import WalletSelectDialog from 'src/components/WalletSelectDialog.vue';
import { HandCashConnect } from '@handcash/handcash-connect';
import { StateInterface } from 'src/store';
import { useStore } from 'vuex';
import { MoneyButtonClient } from '@moneybutton/api-client';
import { init, requestFullScreen } from 'src/utils/fullscreen';

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
    const game = ref('');
    const localhost = ref(false);
    localhost.value = document.location.hostname === 'localhost';
    game.value = `/games/${route.params.game}/index.html`;
    const handCashConnect = new HandCashConnect('60e035695668df0b4bd0d46a');
    const mbClient = new MoneyButtonClient('7decb140dd50f2b6fa27582bbea10e7c');

    const amount = ref(0);

    const data = reactive<AppState>(Object.assign({}, INITIAL_STATE));

    const subscribeToEvents = () => {
      data.client!.on(CLIENT_EVENTS.pairing.proposal, async (proposal: PairingTypes.Proposal) => {
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
      });

      data.client!.on(CLIENT_EVENTS.session.deleted, (session: SessionTypes.Settled) => {
        if (session.topic !== data.session?.topic) return;
        console.log('EVENT', 'session_deleted');
        resetApp();
      });
    };

    eventHub.$on('disconnect', () => resetApp());

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

    const checkPersistedState = async () => {
      if (typeof data.client === 'undefined') {
        throw new Error('WalletConnect is not initialized');
      }
      if (data.client.session.topics.length) {
        const session = await data.client.session.get(data.client.session.topics[0]);
        data.accounts = session.state.accounts;
        onSessiconnected(session);
      }
    };

    const onSessiconnected = async (session: SessionTypes.Settled) => {
      console.log("Amence",data.accounts[0].split('@')[0].split('||')[0] );
      data.session = session;
      data.accounts = session.state.accounts;
      eventHub.$emit('connected', data.accounts[0].split('@')[0]);
      router.push({path:'/index',query:{account:data.accounts[0].split('@')[0].split('||')[0]}});
    };

    const getAccountBalances = async () => {
      try {
        const result = await data.client!.request({
          topic: data.session!.topic,
          chainId: 'bsv:livenet',
          request: {
            method: 'getBalance',
          },
        });
        console.log('getAccountBalances', result);
        const balances: AccountBalances = {};
        result.forEach(({ account, assets }) => {
          balances[account] = assets;
        });
        return balances;
      } catch (error) {
        console.error(error);
        return {};
      }
    };

    const signOutputsAndBroadcast = async (outputs) => {
      try {
        const txid = await data.client!.request({
          topic: data.session!.topic,
          chainId: CHAIN_ID,
          request: {
            method: DEFAULT_METHODS.signOutputsAndBroadcast,
            params: outputs,
          },
        });
        return txid;
      } catch (error) {
        console.error(error);
      }
    };

    eventHub.$on('connect', async (metadata: AppMetadata) => {
      // 稍作延迟 等待监听启动
      setTimeout(async () => {
        if (data.accounts.length === 0 && !store.state.account) {
          $q.dialog({
            component: WalletSelectDialog,
          }).onOk(async (selectedWalletName: string) => {
            if (selectedWalletName === 'WalletConnect') {
              connect(metadata);
            } else if (selectedWalletName === 'HandCash') {
              LocalStorage.set('pathBeforeAuth', route.path);
              const redirectionLoginUrl = handCashConnect.getRedirectionUrl();
              location.href = redirectionLoginUrl;
            } else if (selectedWalletName === 'MoneyButton') {
              LocalStorage.set('pathBeforeAuth', route.path);
              mbClient.requestAuthorization(
                'auth.user_identity:read users.profiles:read users.balance:read',
                'https://game.mydapp.io/moneyButtonSuccess'
              );
            } else if (selectedWalletName === 'Relayx') {
              LocalStorage.set('pathBeforeAuth', route.path);
              const token = await window.relayone.authBeta();
              const [payload, signature] = token.split('.');
              // TODO check signature
              const data = JSON.parse(atob(payload));
              store.dispatch('setAccount', { merchant: 'relayx', authToken: data.pubkey, payload: data });
              eventHub.$emit('connected', `${data.pubkey}||${data.paymail}`);
              // check its token from your origin
              // if (data.origin !== 'yourdomain.com') throw new Error();
            }
          });
        } else {
          if (store.state.account) {
            if (store.state.account.merchant === 'handcash') {
              const account = handCashConnect.getAccountFromAuthToken(store.state.account.authToken);
              const { publicProfile } = await account.profile.getCurrentProfile();
              store.dispatch('setAccount', Object.assign(store.state.account, { payload: publicProfile }));
              eventHub.$emit('connected', `${publicProfile.handle}||${publicProfile.paymail}`);
            } else if (store.state.account.merchant === 'moneybutton') {
              mbClient.setRefreshToken(store.state.account.refreshToken);
              mbClient.setAccessToken(store.state.account.authToken);
              const { id: userId } = await mbClient.getIdentity();
              const profile = await mbClient.getUserProfile(userId);
              eventHub.$emit('connected', `${profile.name}||${profile.primaryPaymail}`);
            } else if (store.state.account.merchant === 'relayx') {
              if (await window.relayone.isLinked()) {
                eventHub.$emit('connected', `${store.state.account.payload.pubkey}||${store.state.account.payload.paymail}`);
              } else {
                eventHub.$emit('connect', metadata);
              }
            }
          } else {
            eventHub.$emit('connected', data.accounts[0].split('@')[0]);
          }
        }
      }, 500);
    });

    eventHub.$on('getBalance', async () => {
      let balances: AccountBalances = {};
      if (store.state.account) {
        if (store.state.account.merchant === 'handcash') {
          const account = handCashConnect.getAccountFromAuthToken(store.state.account.authToken);
          const { spendableSatoshiBalance, spendableFiatBalance, currencyCode } = await account.wallet.getSpendableBalance();
          balances[store.state.account.payload.paymail] = [
            <AssetData>{
              symbol: 'SATS',
              name: 'satoshi',
              decimals: '0',
              balance: spendableSatoshiBalance,
            },
          ];
        } else if (store.state.account.merchant === 'moneybutton') {
          // TODO
        } else if (store.state.account.merchant === 'relayx') {
          const usd = await window.relayone.getBalance();
          balances[store.state.account.payload.paymail] = [
            <AssetData>{
              symbol: 'USD',
              name: 'dollar',
              decimals: '2',
              balance: usd,
            },
          ];
        }
      } else {
        balances = await getAccountBalances();
      }

      eventHub.$emit('getBalanceDone', balances);
    });

    const paymentTest = () => {
      // const paymentList = [
      //   <Payment>{
      //     toAddress: '14cXHdXNaFJY26w7ZhkBbZFEXZaAyXnnsW',
      //     amount: 1000,
      //   },
      // ];
      // const onChainData = ['suhao@chainbow.io', 'text', 'L'];
      // eventHub.$emit('payment', paymentList, onChainData);
    };

    eventHub.$on('payment', async (paymentParameters: PaymentParameters) => {
      if (store.state.account) {
        if (store.state.account.merchant === 'handcash') {
          const account = handCashConnect.getAccountFromAuthToken(store.state.account.authToken);
          try {
            const paymentResult = await account.wallet.pay(paymentParameters);
            eventHub.$emit('paymentDone', null, paymentResult);
          } catch (e) {
            eventHub.$emit('paymentDone', e, null);
          }
        } else if (store.state.account.merchant === 'moneybutton') {
          // @ts-ignore
          const imb = new window.moneyButton.IMB({ clientIdentifier: '9d514ed833108f076ffb206ecb7935c7' });
          try {
            let outputs = [] as any[];

            for (let index = 0; index < paymentParameters.payments.length; index++) {
              const payment = paymentParameters.payments[index];
              outputs.push({
                to: payment.to,
                amount: store.getters.convertUnit('SATS', 'BSV', payment.amount),
                currency: 'BSV',
              });
            }

            const paymentResult = await imb.swipe({
              outputs,
            });
            eventHub.$emit('paymentDone', null, paymentResult);
          } catch (e) {
            eventHub.$emit('paymentDone', e, null);
          }
        } else if (store.state.account.merchant === 'relayx') {
          let outputs = [] as any[];

          for (let index = 0; index < paymentParameters.payments.length; index++) {
            const payment = paymentParameters.payments[index];
            outputs.push({
              to: payment.to,
              amount: store.getters.convertUnit('SATS', 'BSV', payment.amount),
              currency: 'BSV',
            });
          }

          try {
            const paymentResult = await window.relayone.send({
              outputs,
              opReturn: paymentParameters.attachment?.value,
            });
            eventHub.$emit('paymentDone', null, paymentResult);
          } catch (e) {
            eventHub.$emit('paymentDone', e, null);
          }
        }
      } else {
        try {
          const paymentResult = await pay(paymentParameters);
          if (paymentResult) {
            eventHub.$emit('paymentDone', null, paymentResult);
          } else {
            eventHub.$emit('paymentDone', 'No paymentResult response', null);
          }
        } catch (e) {
          eventHub.$emit('paymentDone', e, null);
        }
      }
    });

    const pay = async (paymentParameters: PaymentParameters) => {
      const res = await data.client!.request({
        topic: data.session!.topic,
        chainId: CHAIN_ID,
        request: {
          method: DEFAULT_METHODS.pay,
          params: paymentParameters,
        },
      });
      return res;
    };

    const login = () => {
      const app = <AppMetadata>{
        name: 'ChainBow Admin',
        description: 'ChainBow Admin',
        url: 'http://chainbow.io',
        icons: ['http://image.5you.com/attachment/soft/2020/1021/100148_22591334.png'],
      };
      eventHub.$emit('connect', app);
    };

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

    onMounted(async () => {
      data.client = await Client.init({
        relayProvider: DEFAULT_RELAY_PROVIDER,
      });
      subscribeToEvents();
      await checkPersistedState();
      init();
    });

    const checkAddressFormat = (val) => {
      const bitcoin = /^[1mn][a-km-zA-HJ-NP-Z1-9]{25,34}$/;
      const email =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return bitcoin.test(val) || email.test(val);
    };

    window.query = route.query;

    return {
      ...toRefs(data),
      game,
      amount,
      localhost,
      login,
      resetApp,
      checkAddressFormat,
      paymentTest,
      requestFullScreen,
    };
  },
};
</script>
