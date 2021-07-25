import { NoticeInfo } from './model/NoticeInfo';
import { reactive, toRefs, ref, watch } from 'vue';
import { useDialogPluginComponent } from 'quasar';
import axios from 'axios';
import { useStore } from 'vuex';
import { backServerUrl, langOptions, useEditor } from 'src/utils/index';



export default function useNoticeDialog(props: any) {
  const { toolbar, font } = useEditor();
  const store = useStore();

  const {
    dialogRef,
    onDialogHide,
    onDialogOK,
    onDialogCancel
  } = useDialogPluginComponent();

  const data = reactive({
    title: '',
    content: '',
    dialog: false,
    position: 'top',
    noticeTip: '请输入完整内容',
    lang: { label: 'English', value: 'en' },
    options: langOptions,
  });
  const account: string = store.state.account?.accountName;

  if (props.choiceLang) {
    data.lang = props.choiceLang;
  }

  if (props.row) {
    data.title = props.row.title;
    data.content = props.row.content;
    const choiceOption = data.options.find(item => item.value == props.row.lang);
    if (choiceOption) {data.lang = choiceOption}
  }

  const clearInput = () => {
    data.title = '';
    data.content = '';
  }

  const pushNotice = () => {
    if (!checkInputFormat() || !checkEditorFormat()) {
      data.dialog = true;
      return;
    }
    let notice: NoticeInfo;
    if (props.row) {
      notice = new NoticeInfo(data.title, data.content, data.lang.value, props.row.id, props.row.name, props.row.address);
    } else {
      notice = new NoticeInfo(data.title, data.content, data.lang.value);
    }
    const accoutInfoArray: string[] = account.split("|");
    notice.name = accoutInfoArray[0];
    notice.address = accoutInfoArray[accoutInfoArray.length - 1];
    const pushNoticeUrl = backServerUrl + '/v1/pushServerNotice';
    axios.post(pushNoticeUrl, notice).then(res => {
      if (res.data.success) {
        onDialogOK();
        onDialogHide();
        return;
      }
      data.dialog = true;
      data.noticeTip = res.data.result;
    });

  };

  const checkInputFormat = () => {
    return data.title ? true : false;
  };
  const checkEditorFormat = () => {
    return data.content ? true : false;
  };

  return {
    dialogRef,
    onDialogHide,
    onDialogOK,
    onDialogCancel,
    toolbar,
    font,
    ...toRefs(data),
    pushNotice,
    checkInputFormat,
    checkEditorFormat,
    clearInput
  };
}
