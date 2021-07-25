<template>
  <div>
    <q-dialog ref="dialogRef">
      <div class="dialog-panel column items-start">
        <label class="dialog-title">{{ title }}</label>
        <label class="dialog-content">{{ content }}</label>

        <div class="dialog-panel-div row justify-end">
          <q-btn
            flat
            label="Cancel"
            color="secondary"
            @click="onDialogHide()"
          />
          <q-btn label="DELETE" color="red" @click="confirmDelete" />
        </div>
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

<script lang="ts">
import { defineComponent, toRefs, reactive } from "vue";
import { useDialogPluginComponent, useQuasar } from "quasar";

import axios from "axios";
import { useStore } from "vuex";

import { backServerUrl, langOptions } from "src/utils/index";

function convertPropsToData(props: any, data: any) {
  data.name = props.row.name;
  data.deleteParams.name = props.row.name;
  data.routePath = props.type ? props.type : "/";
  if (props.type == "admin") {
    data.title = "管理员删除";
    data.content = "确认删除该管理员？";
    data.deleteUrl = backServerUrl + "/v1/deleteAdmin";
    data.deleteParams.id = props.row?.id;
  } else if (props.type == "notice") {
    data.title = "通知删除";
    data.content = "确认删除该条通知？";
    data.deleteUrl = backServerUrl + "/v1/deleteNotice";
    data.deleteParams.id = props.row?.id;
    const langOption = langOptions.find(
      (item) => item.label == props.row?.lang
    );
    if (langOption) {
      data.deleteParams.lang = langOption.value;
    }
  }
}

export default defineComponent({
  name: "NoticeDialog",
  props: {
    row: {
      type: Object,
    },
    type: {
      type: String,
    },
  },
  emits: [...useDialogPluginComponent.emits],
  setup(props) {
    const store = useStore();

    const data = reactive({
      name: "",
      dialog: false,
      position: "top",
      tipInfo: "删除失败",
      title: "",
      content: "",
      deleteUrl: "",
      deleteParams: { id: "", lang: "", name: "", address: "" },
      routePath: "/",
    });
    const account: string = store.state.account?.accountName;
    const accoutInfoArray: string[] = account.split("|");
    data.deleteParams.address = accoutInfoArray[accoutInfoArray.length - 1];
    if (props.row) {
      convertPropsToData(props, data);
    }
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();

    const confirmDelete = () => {
      try {
        axios.post(data.deleteUrl, data.deleteParams)
          .then((res) => {
            if (res.data.success) {
              onDialogOK();
              onDialogHide();
            } else {
              data.dialog = true;
              data.tipInfo = res.data.result ? res.data.result : "删除失败";
            }
          });
      } catch (e) {
        data.dialog = true;
        data.tipInfo = "删除失败";
      }
    };

    return {
      dialogRef,
      onDialogHide,
      onDialogOK,
      onDialogCancel,
      ...toRefs(data),
      confirmDelete,
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
    width: 30%;
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
}

.dialog-tip {
  width: 25rem;
  color: red;
  font-size: 1rem;
  font-weight: bold;
}
.dialog-title {
  font-size: 1.5rem;
  color: black;
  padding: 1rem 1rem 1rem 2rem;
  font-weight: 500;
}
.dialog-content {
  font-size: 1rem;
  color: black;
  padding: 1rem 1rem 0rem 2rem;
}
.dialog-panel-div {
  width: 100%;
  padding: 1rem;
}
</style>
