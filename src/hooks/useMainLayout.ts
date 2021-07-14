import { ref, reactive, onMounted, toRefs } from 'vue';
// import { useQuasar } from 'quasar';
import { useQuasar } from 'quasar';

import NoticeDialog from 'src/components/NoticeDialog.vue';
import axios from 'axios';
import { Notice } from './Notice';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { StateInterface } from 'src/store';


const columns = [
  {
    name: 'id',
    align: 'center',
    label: 'id',
    field: 'id',
    sortable: true,
  },
  { name: 'name', label: 'name', field: 'name' },
  { name: 'title', label: 'title', field: 'title' },
  {
    name: 'time',
    label: 'time',
    field: 'time',
    sortable: true,
  },
  {
    name: 'operation',
    label: 'operation',
    field: 'operation',
    required: true,
  },
];

function getNoticeList() {
  return axios
    .get('http://127.0.0.1/v1/pullServerNotice')
    .then(function (response) {
      return response.data.result;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export default function useMainLayout() {
  const selected = ref([]);
  const $q = useQuasar();
  const route = useRoute();
  const router = useRouter();
  const store = useStore<StateInterface>();

  const data = reactive({
    rows: [] as Notice[],
    account: store.state.account?.accountName,
  });


  // 退出登陆
  const loginout = async () => {
    store.dispatch('setAccount', undefined);
    router.push({ path: '/' });
  };



  onMounted(async () => {
    data.rows = (await getNoticeList()) as Notice[];
  });

  const modifyNotice = (props: any) => {
    $q.dialog({
      component: NoticeDialog,
      componentProps: {
        row: props ? props.row : null,
      },
    });
  };

  return {
    selected,
    columns,
    // getSelectedString,
    drawer: ref(false),
    modifyNotice,
    ...toRefs(data),
    loginout
  };
}