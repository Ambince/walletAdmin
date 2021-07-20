<template>
  <q-page padding>
    <div class="q-pa-md column">
      <div class="q-pa-md row justify-end">
        <q-select
          v-model="lang"
          :options="options"
          label="选择语言"
          class="lang-select"
          input-style="background-color: #ff0000"
        />
        <q-btn color="secondary" label="新增" @click="modifyNotice(null)" />
      </div>

      <q-table
        title="notice list"
        :rows="rows"
        :columns="columns"
        row-key="operation"
        v-model:selected="selected"
      >
        <template v-slot:body-cell-operation="props">
          <td class="text-right td-text">
            <q-btn
              color="secondary"
              label="编辑"
              @click="() => modifyNotice(props)"
            />
          </td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import useNoticePage from "src/hooks/useNoticePage";

export default defineComponent({
  name: "NoticePage",
  setup() {
    return useNoticePage();
  },
});
</script>

<style>
.drawer-area {
  height: calc(100% - 150px);
  margin-top: 150px;
  border-right: 1px solid;
}
.td-text {
  font-size: 100px;
}

.lang-select {
  width: 10rem;
  margin-right: 2rem;
}
</style>
