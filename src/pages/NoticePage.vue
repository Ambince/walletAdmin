<template>
  <q-page>
    <div class="q-pa-md">
      <div class="q-pa-md row justify-end">
        <q-select
          color="black"
          v-model="lang"
          :options="options"
          label="选择语言"
          class="lang-select"
          virtual-scroll
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
             <q-btn
              class="q-ml-sm"
              color="red"
              label="删除"
              @click="() => deleteNotice(props)"
            />
          </td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import useNoticePage from 'src/hooks/useNoticePage';

export default defineComponent({
  name: 'NoticePage',
  setup() {
    return useNoticePage();
  },
});
</script>

<style scoped lang="scss">
.drawer-area {
  height: calc(100% - 150px);
  margin-top: 150px;
  border-right: 1px solid;
}
.td-text {
  font-size: 1rem;
}
.lang-select {
  margin-right: 2rem;
  width: 6rem;
}
</style>
