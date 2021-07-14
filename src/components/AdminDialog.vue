<template>
  <div>
    <q-dialog ref="dialogRef">
      <q-card>
        <div class="dialog-panel">
          <q-input
            :rules="[() => checkInputFormat()]"
            reactive-rules
            v-model="title"
            label="管理员账号"
            stack-label
            style="width: 100%"
            class="dialog-panel-input"
          />
          <div class="row justify-center q-mt-lg">
            <q-btn label="Submit" color="secondary" @click="pushAdmin" />
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent, toRefs,reactive } from 'vue';
import { useDialogPluginComponent, useQuasar } from 'quasar';

import axios from 'axios';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'NoticeDialog',
  props: {
    row: {
      type: Object,
    },
  },
  emits: [...useDialogPluginComponent.emits],
  setup(props) {
    const $q = useQuasar();
    const router = useRouter();

    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();

    const data = reactive({
      title: '',
      content: '',
      dialog: false,
      position: 'top',
    });
    const pushAdmin = () => {
      if (!checkInputFormat()) {
        data.dialog = true;
        return;
      }
      // const pushNoticeUrl = 'http://127.0.0.1/v1/pushServerNotice';
      // axios.post(pushNoticeUrl, notice).then((res) => {});
      onDialogHide();
      // 刷新主页面
      router.go(0);
    };

    const checkInputFormat = () => {
      return data.title ? true : false;
    };

    return {
      dialogRef,
      onDialogHide,
      onDialogOK,
      onDialogCancel,
      ...toRefs(data),
      pushAdmin,
      checkInputFormat,
    };
  },
});
</script>

<style scoped lang="scss">
.q-dialog__inner--minimized > div {
  max-width: 45%;
}

.dialog-panel {
  background: white;
  padding: 2rem;
  width: 40rem;
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
