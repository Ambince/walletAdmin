<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lff" class="shadow-2 rounded-borders">
      <q-header elevated class="bg-cyan-8">
        <q-toolbar>
          <q-toolbar-title>Notice</q-toolbar-title>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        </q-toolbar>
      </q-header>

      <q-drawer v-model="drawer" show-if-above :width="200" :breakpoint="400">
        <q-scroll-area class="drawer-area">
          <q-list padding>
            <q-item active clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="img:bell.svg" />
              </q-item-section>
              <q-item-section> Notice </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img
          class="absolute-top"
          src="https://cdn.quasar.dev/img/material.png"
          style="height: 150px"
        >
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <div class="text-weight-bold">Wallet Account</div>
          </div>
        </q-img>
      </q-drawer>

      <q-page-container>
        <q-page padding>
          <div class="q-pa-md column">
            <div class="q-pa-md row justify-end">
              <q-btn color="primary" label="新增" @click="modifyNotice()" />
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
                    color="primary"
                    label="编辑"
                    @click="() => modifyNotice(props)"
                  />
                </td>
              </template>
            </q-table>
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import useMainLayout from 'src/hooks/useMainLayout';

export default defineComponent({
  name: 'MainLayout',
  setup() {
    return useMainLayout();
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
  font-size: 100px;
}
</style>
