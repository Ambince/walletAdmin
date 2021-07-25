<template>
  <q-layout view="lHh Lpr lff" class="shadow-2 rounded-borders">
    <q-header elevated class="bg-cyan-8">
      <q-toolbar>
        <q-toolbar-title>{{ title }}</q-toolbar-title>
        <q-btn flat @click="logout" label="登出"></q-btn>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" show-if-above :width="275" :breakpoint="400">
      <q-scroll-area class="drawer-area">
        <q-list padding>
          <q-item active clickable v-ripple @click="pageTo('notice')">
            <q-item-section avatar>
              <q-icon name="img:bell.svg" />
            </q-item-section>
            <q-item-section style="color: black"> Notice </q-item-section>
          </q-item>

          <q-item active clickable v-ripple @click="pageTo('admin')">
            <q-item-section avatar>
              <q-icon name="img:personal.svg"></q-icon>
            </q-item-section>
            <q-item-section style="color: black"> Administer </q-item-section>
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
          <div class="text-weight-bold">{{ accountName }}</div>
          <div class="text-address">{{ accountAddress }}</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive,toRefs } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { StateInterface } from "src/store";
import useWalletConnect from "src/hooks/useWalletConnect";

function convertAccountInfo(accountInfo: string | undefined, data: any) {
  const accountArray = accountInfo?.split("|");
  if (!accountArray) {return; }
  data.accountName = accountArray[0];
  data.accountAddress = accountArray[accountArray.length - 1];
}

export default defineComponent({
  name: "MainLayout",
  setup() {
    const data = reactive({
      title: "ChainAdmin",
      accountName: "未获取",
      accountAddress: "未获取",
      drawer:false,
    });
    const router = useRouter();
    const store = useStore<StateInterface>();
    convertAccountInfo(store.state.account?.accountName, data);
    const logout = () => {
      const { dataWC, disconnect } = useWalletConnect(false);
      if (dataWC.session?.topic) {
        disconnect(dataWC.session.topic);
      }
      store.dispatch("setAccount", undefined);
      store.dispatch("setIndexReload", true);
      router.push({ path: "/" });
    };

    onMounted(async () => {
      if (!store.state.account?.accountName) {
        logout();
      }
    });

    const pageTo = (path: string) => {
      if (path == "admin") {
        data.title = "管理员设置";
      }
      if (path == "notice") {
        data.title = "通知设置";
      }
      router.push({ path: path });
    };
    return { ...toRefs(data), pageTo, logout, };
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
.text-address{
  font-size: 0.5rem;
  font-weight: 500;
}
</style>
