<template>
  <q-dialog ref="dialogRef">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="row justify-between items-center">
          <div class="text-h6">Login by wallet</div>
          <q-btn flat round v-close-popup icon="close" />
        </div>
        <q-field rounded outlined stack-label>
          <template v-slot:control>
            <div class="q-pl-md">
              使用管理员钱包扫码二维码登陆Chainbow管理后台  
            </div>
          </template>
        </q-field>
        <br />
        <q-btn
          style="width: 100%; height: 4rem"
          @click="onOKClick(wallet.name)"
          outline
          class="q-mb-sm"
          v-for="wallet in wallets"
          :key="wallet"
        >
          <div style="width: 100%" class="row justify-between items-center">
            <div style="text-transform: none" class="text-h6">
              {{ wallet.name }}
            </div>
            <img style="width: 2rem" :src="wallet.icon" />
          </div>
        </q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { useDialogPluginComponent } from 'quasar';
import Peer from 'src/components/Peer.vue';
import { defineComponent, PropType, reactive, toRefs } from 'vue';
import { PairingTypes } from '@walletconnect/types';

export default defineComponent({
  name: 'SessionDialog',
  props: {
    pairings: {
      type: Object as PropType<PairingTypes.Settled>,
      required: true,
    },
  },

  emits: [...useDialogPluginComponent.emits],
  setup(props) {
    const data = reactive({
      wallets: [{ name: 'WalletConnect', icon: '/walletconnection.svg' }],
    });
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();
    return {
      ...toRefs(data),
      dialogRef,
      onDialogHide,
      onOKClick(payload?: any) {
        onDialogOK(payload);
      },
    };
  },
});
</script>
