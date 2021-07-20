import { ref, reactive, onMounted, toRefs, watch } from 'vue';
import { useQuasar } from 'quasar';

import NoticeDialog from 'src/components/NoticeDialog.vue';
import axios from 'axios';
import { NoticeInfo } from './model/NoticeInfo';
import { useStore } from 'vuex';
import { StateInterface } from '../store';
import { backServerUrl } from '../utils/index';



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

function getNoticeList(lang: string) {
  return axios
    .get(backServerUrl + '/v1/pullServerNotice', {
      params: { lang: lang },
    })
    .then(function (response) {
      return response.data.result;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export default function useNoticePage() {
  const selected = ref([]);
  const $q = useQuasar();
  const store = useStore<StateInterface>();

  const data = reactive({
    rows: [] as NoticeInfo[],
    account: store.state.account?.accountName,
    lang: { label: '中文', value: 'zh' },
    options: [{ label: '中文', value: 'zh' }, { label: '日语', value: 'ja' }, { label: 'English', value: 'en' }]
  });
  onMounted(async () => {
    data.rows = (await getNoticeList(data.lang.value)) as NoticeInfo[];
  });

  watch(() => (data.lang), async () => {
    data.rows = (await getNoticeList(data.lang.value)) as NoticeInfo[];
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
    modifyNotice,
    ...toRefs(data)

  };
}