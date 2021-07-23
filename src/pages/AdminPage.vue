<template>
  <div class="q-pa-md">
    <div class="q-pa-md row justify-end">
      <q-btn color="secondary" label="新增" @click="modifyAdmin(null)" />
    </div>
    <q-table
      title="Admin list"
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
            @click="() => modifyAdmin(props)"
          />
          <q-btn
            class="q-ml-sm"
            color="red"
            label="删除"
            @click="() => deleteAmin(props)"
          />
        </td>
      </template>
    </q-table>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import useAdmin from 'src/hooks/useAdmin';

export default defineComponent({
  name: 'AdminPage',
  setup() {
    return useAdmin();
  },
});
</script>

<style>
.drawer-area {
  height: calc(100% - 150px);
  margin-top: 150px;
  border-right: 1px solid #ddd;
}
.td-text {
  font-size: 1rem;
}
</style>
