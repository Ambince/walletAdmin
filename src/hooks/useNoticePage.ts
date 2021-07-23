import { ref, reactive, onMounted, toRefs, watch } from 'vue';
import { useQuasar } from 'quasar';

import NoticeDialog from 'src/components/NoticeDialog.vue';
import DeleteDialog from 'src/components/DeleteDialog.vue';

import axios from 'axios';
import { NoticeInfo } from './model/NoticeInfo';
import { useStore } from 'vuex';
import { StateInterface } from '../store';
import { backServerUrl, langOptions } from '../utils/index';



const columns = [
  {
    name: 'id',
    align: 'center',
    label: 'id',
    field: 'id',
    sortable: true,
  },
  { name: 'lang', label: '语言 ', field: 'lang' },
  { name: 'name', label: '发布人 ', field: 'name' },
  { name: 'title', label: '通知主题', field: 'title' },
  {
    name: 'time',
    label: '发布时间',
    field: 'time',
    sortable: true,
  },
  {
    name: 'operation',
    label: '操作',
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


async function pullNoticeFromServer(langValue: string): Promise<NoticeInfo[]> {
  const notices = (await getNoticeList(langValue)) as NoticeInfo[];
  for (const notice of notices) {
    const langConfig = langOptions.find((item) => item.value == notice.lang);
    notice.lang = langConfig?.label;
  }
  return notices;
}

export default function useNoticePage() {
  const selected = ref([]);
  const $q = useQuasar();
  const store = useStore<StateInterface>();

  const data = reactive({
    rows: [] as NoticeInfo[],
    account: store.state.account?.accountName,
    lang: { label: '中文', value: 'zh' },
    options: langOptions
  });

  onMounted(async () => {
    data.rows = await pullNoticeFromServer(data.lang.value);
  });

  watch(() => (data.lang), async () => {
    data.rows = await pullNoticeFromServer(data.lang.value);
  });

  const modifyNotice = (props: any) => {
    $q.dialog({
      component: NoticeDialog,
      componentProps: {
        row: props ? props.row : null,
        choiceLang: data.lang,
      },
    }).onOk(async () => {
      data.rows = await pullNoticeFromServer(data.lang.value);
    });
  };

  const deleteNotice = (props: any) => {
    $q.dialog({
      component: DeleteDialog,
      componentProps: {
        row: props ? props.row : null,
        type: 'notice',
      },
    }).onOk(async () => {
      data.rows = await pullNoticeFromServer(data.lang.value);
    });
  }

  return {
    selected,
    columns,
    modifyNotice,
    deleteNotice,
    ...toRefs(data)
  };
}