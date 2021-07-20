<template>
  <div>
    <q-dialog ref="dialogRef">
      <q-card>
        <div class="dialog-panel">
          <q-input
            :rules="[() => checkInputFormat()]"
            reactive-rules
            v-model="name"
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

    <q-dialog v-model="dialog" :position="position">
      <q-card class="dialog-tip">
        <q-card-section>
          <div class="row justify-center">
            <q-icon></q-icon>
            <label>{{ tipInfo }}</label>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent, toRefs, reactive } from 'vue';
import { useDialogPluginComponent, useQuasar } from 'quasar';

import axios from 'axios';
import { useRouter } from 'vue-router';
import { AdminInfo } from 'src/hooks/model/AdminInfo';
import { backServerUrl } from 'src/utils/index';

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

    const data = reactive({
      name: '',
      dialog: false,
      position: 'top',
      tipInfo: '请输入完整内容',
    });
    if (props.row) {
      // eslint-disable-next-line vue/no-setup-props-destructure
      data.name = props.row.name;
    }
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();

    const pushAdmin = () => {
      if (!checkInputFormat()) {
        data.dialog = true;
        return;
      }
      let pushUrl;
      let admin;
      if (props.row) {
        pushUrl = backServerUrl + '/v1/updateAdmin';
        admin = new AdminInfo(data.name, props.row.id);
      } else {
        pushUrl = backServerUrl + '/v1/addAdmin';
        admin = new AdminInfo(data.name);
      }
      axios.post(pushUrl, admin).then((res) => {
        if (res.data.success) {
          onDialogHide();
          router.push({
            path: '/index',
          });
        } else {
          data.dialog = true;
          data.tipInfo = res.data.result;
        }
      });
    };

    const checkInputFormat = () => {
      return data.name ? true : false;
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
