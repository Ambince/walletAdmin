<template>
  <div>
    <q-dialog ref="dialogRef">
      <q-card>
        <div class="dialog-panel">
          <q-select
            v-model="lang"
            :options="options"
            label="发布语言"
            class="dialog-panel-input"
          />

          <q-input
            :rules="[() => checkInputFormat()]"
            reactive-rules
            v-model="title"
            label="通知标题"
            stack-label
            style="width: 100%"
            class="dialog-panel-input"
          />

          <q-editor v-model="content" :toolbar="toolbar" :fonts="font" />
          <div class="row justify-center q-mt-lg">
            <q-btn label="Submit" color="primary" @click="pushNotice" />
            <q-btn
              label="Reset"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </div>
        </div>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialog" :position="position">
      <q-card class="dialog-tip">
        <q-card-section>
          <div class="row justify-center">
            <q-icon></q-icon>
            <label>请输入完整内容</label>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent, props } from 'vue';
import { useDialogPluginComponent } from 'quasar';
import useNotice from 'src/hooks/useNotice';

export default defineComponent({
  name: 'NoticeDialog',
  props: {
    row: {
      type: Object
    }
  },
  emits: [...useDialogPluginComponent.emits],
  setup(props) {
    return useNotice(props);
  }
});
</script>

<style scoped lang="scss">
.q-dialog__inner--minimized > div {
  max-width: 45%;
}

.dialog-panel {
  background: white;
  padding: 2rem;
}
.dialog-panel-input {
  width: 100%;
  margin-bottom: 2rem;
}

.dialog-tip {
  width: 25rem;
  color: red;
  font-size: 1rem;
  font-weight: bold;
}
</style>
