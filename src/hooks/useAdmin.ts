import { ref, reactive, onMounted, toRefs } from 'vue';
// import { useQuasar } from 'quasar';
import { useQuasar } from 'quasar';

import AdminDialog from 'src/components/AdminDialog.vue';
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
  { name: 'admin', label: 'admin', field: 'admin' },

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
    .get('http://127.0.0.1/v1/pullServerAdmin')
    .then(function (response) {
      return response.data.result;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export default function useAdmin() {
  const selected = ref([]);
  const $q = useQuasar();
  const route = useRoute();
  const router = useRouter();
  const store = useStore<StateInterface>();

  const data = reactive({
    rows: [] as Notice[],
    account: store.state.account?.accountName,
  });





  onMounted(async () => {
    data.rows = (await getNoticeList()) as Notice[];
  });

  const modifyAdmin = (props: any) => {
    $q.dialog({
      component: AdminDialog,
      componentProps: {
        row: props ? props.row : null,
      },
    });
  };

  return {
    selected,
    columns,
    drawer: ref(false),
    modifyAdmin,
    ...toRefs(data),

  };
}