<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lff" class="shadow-2 rounded-borders">
      <q-btn @click="login">登录</q-btn>
    </q-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import QRCodeModal from '@walletconnect/qrcode-modal';

import { useRouter } from 'vue-router';
import { eventHub } from 'src/boot/booting-misc';
import { AppMetadata, PairingTypes, SessionTypes } from '@walletconnect/types';
import Client, { CLIENT_EVENTS } from '@walletconnect/client';
import {
  CHAIN_ID,
  DEFAULT_LOGGER,
  DEFAULT_METHODS,
  DEFAULT_RELAY_PROVIDER,
  validatePaymail
} from 'src/utils';

interface AppState {
  client: Client | undefined;
  session: SessionTypes.Created | undefined;
  accounts: string[];
}

const INITIAL_STATE: AppState = {
  client: undefined,
  session: undefined,
  accounts: []
};

export default defineComponent({
  name: 'Login',
  setup() {
    const router = useRouter();
    const data = reactive<AppState>(Object.assign({}, INITIAL_STATE));

    const login = () => {
      const app = <AppMetadata>{
        name: 'ddz',
        description: 'chainbow ddz',
        url: 'http://chainbow.io',
        icons: [
          'http://image.5you.com/attachment/soft/2020/1021/100148_22591334.png'
        ]
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
              chains: ['bsv:livenet']
            },
            jsonrpc: {
              methods: Object.values(DEFAULT_METHODS)
            }
          }
        });
        onSessiconnected(session);
      } catch (e) {
        // ignore rejection
      }
      // close modal in case it was open
      QRCodeModal.close();
    };

    const onSessiconnected = async (session: SessionTypes.Settled) => {
      data.session = session;
      data.accounts = session.state.accounts;
      eventHub.$emit('connected', data.accounts[0].split('@')[0]);
    };

    return { login };
  }
});
</script>
