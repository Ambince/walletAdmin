import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// const api = axios.create({ baseURL: 'https://api.example.com' });

export default boot(({ app }) => {
  axios.defaults.baseURL = document.location.hostname === 'localhost' ? 'http://localhost/v1' : 'https://game.mydapp.io/v1/';
  app.config.globalProperties.$axios = axios;
});

export { axios };
