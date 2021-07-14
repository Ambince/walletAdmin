<template>
  <q-dialog ref="dialogRef">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="text-h6">Select available pairing or create new one</div>
        <q-list bordered>
          <q-item v-for="pairing in pairings" :key="pairing" @click="onOKClick({ topic: pairing.topic })" clickable v-ripple>
            <img :src="pairing.state?.metadata?.icons ? pairing.state.metadata.icons[0] : ''" />
            <div>{{ pairing.state?.metadata?.name || '' }}</div>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" label="New Pairing" @click="onOKClick()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { useDialogPluginComponent } from 'quasar';
import Peer from 'src/components/Peer.vue';
import { defineComponent, PropType } from 'vue';
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
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();
    return {
      dialogRef,
      onDialogHide,
      onOKClick(payload?: any) {
        onDialogOK(payload);
      },
    };
  },
});
</script>
