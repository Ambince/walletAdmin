<template>
  <!-- <loading v-if="loading"></loading> -->
  <router-view />
</template>
<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
import { useStore } from './store';
import { useRoute, useRouter } from 'vue-router';
import { LocalStorage } from 'quasar';

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore();
    const loading = computed(() => store.state.loading);

    return {
      loading,
    };
  },
});
</script>
