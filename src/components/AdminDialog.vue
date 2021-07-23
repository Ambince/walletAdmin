<template>
  <div>
    <q-dialog ref="dialogRef">
      <div class="dialog-panel column items-center">
        <q-input
          :rules="[() => checkInputFormat()]"
          reactive-rules
          v-model="name"
          label="管理员账号"
          class="dialog-panel-input"
        />

        <q-btn label="Submit" color="secondary" @click="pushAdmin" />
      </div>
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
import { defineComponent, toRefs, reactive } from "vue";
import { useDialogPluginComponent } from "quasar";

import axios from "axios";
import { AdminInfo } from "src/hooks/model/AdminInfo";
import { backServerUrl } from "src/utils/index";

export default defineComponent({
  name: "NoticeDialog",
  props: {
    row: {
      type: Object,
    },
  },
  emits: [...useDialogPluginComponent.emits],
  setup(props) {
    const data = reactive({
      name: "",
      dialog: false,
      position: "top",
      tipInfo: "请输入完整内容",
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
      const pushData = { pushUrl: "", admin: AdminInfo };
      if (props.row) {
        pushData.pushUrl = backServerUrl + "/v1/updateAdmin";
        pushData.admin = new AdminInfo(data.name, props.row.id);
      } else {
        pushData.pushUrl = backServerUrl + "/v1/addAdmin";
        pushData.admin = new AdminInfo(data.name);
      }
      axios.post(pushData.pushUrl, pushData.admin).then((res) => {
        if (res.data.success) {
          onDialogOK();
          onDialogHide();
          return;
        }
        data.dialog = true;
        data.tipInfo = res.data.result;
      });
    };

    const checkInputFormat = () => {return data.name ? true : false;};
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
@media screen and (min-width: 700px) {
  .q-dialog__inner--minimized > div {
    max-width: 50%;
  }
  .dialog-panel {
    width: 40%;
  }
}
@media screen and (max-width: 700px) {
  .q-dialog__inner--minimized > div {
    max-width: 100%;
  }
  .dialog-panel {
    width: 100%;
  }
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
