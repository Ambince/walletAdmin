import { ref, reactive, onMounted, toRefs } from 'vue';
// import { useQuasar } from 'quasar';
import { useQuasar } from 'quasar';

import AdminDialog from 'src/components/AdminDialog.vue';
import DeleteDialog from 'src/components/DeleteDialog.vue';
import axios from 'axios';
import { AdminInfo } from './model/AdminInfo';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { StateInterface } from 'src/store';
import { backServerUrl } from 'src/utils/index';


const columns = [
  {
    name: 'id',
    align: 'center',
    label: 'id',
    field: 'id',
    sortable: true,
  },
  { name: 'name', label: 'name', field: 'name' },
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

function getAdminList() {
  return axios
    .get(backServerUrl + '/v1/allAdmin')
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
  const store = useStore<StateInterface>();

  const data = reactive({
    rows: [] as AdminInfo[],
    account: store.state.account?.accountName,
  });


  onMounted(async () => {
    data.rows = (await getAdminList()) as AdminInfo[];
  });

  const modifyAdmin = (props: any) => {
    $q.dialog({
      component: AdminDialog,
      componentProps: {
        row: props ? props.row : null,
      },
    }).onOk(async () => {
      data.rows = (await getAdminList()) as AdminInfo[];
    });
  };

  const deleteAmin = (props: any) => {
    $q.dialog({
      component: DeleteDialog,
      componentProps: {
        row: props ? props.row : null,
        type: 'admin',
      },
    }).onOk(async () => {
      data.rows = (await getAdminList()) as AdminInfo[];
    });;
  };



  return {
    selected,
    columns,
    drawer: ref(false),
    modifyAdmin,
    deleteAmin,
    ...toRefs(data),
  };
}