import Client, { } from "@walletconnect/client";

import { SessionTypes } from "@walletconnect/types";
import { useQuasar } from 'quasar';


export function validatePaymail(text: string): boolean {
  return text.match(/^[^@:]+@[^@]+\.[^@]+$/g) ? true : false;
}

export const DEFAULT_RELAY_PROVIDER = 'wss://wc.cercle.sg';
export const CHAIN_ID = 'bsv:livenet';

export const DEFAULT_LOGGER = 'debug';
export const DEFAULT_METHODS = {
  sign:'sign',
};

// export const backServerUrl = 'http://127.0.0.1:8088';
export const backServerUrl = 'http://139.162.125.233:8088';
// export const backServerUrl = 'http://121.43.41.7:8088';


export interface AppState {
  client: Client | undefined;
  session: SessionTypes.Created | undefined;
  accounts: string[];
  signData:string;
}

export const INITIAL_STATE: AppState = {
  client: undefined,
  session: undefined,
  accounts: [],
  signData:'',

};

export interface AccountBalances {
  [account: string]: AssetData[];
}

export interface AssetData {
  symbol: string;
  name: string;
  decimals: string;
  contractAddress?: string;
  balance?: string;
}


export const langOptions = [
  { label: '中文', value: 'zh' },
  { label: '日文', value: 'ja' },
  { label: 'English', value: 'en' }
]


export function useEditor() {
  const $q = useQuasar();

  const font = {
    arial: 'Arial',
    arial_black: 'Arial Black',
    comic_sans: 'Comic Sans MS',
    courier_new: 'Courier New',
    impact: 'Impact',
    lucida_grande: 'Lucida Grande',
    times_new_roman: 'Times New Roman',
    verdana: 'Verdana'
  };

  const toolbar = [
    [
      {
        label: $q.lang.editor.align,
        icon: $q.iconSet.editor.align,
        fixedLabel: true,
        list: 'only-icons',
        options: ['left', 'center', 'right', 'justify']
      },
      {
        label: $q.lang.editor.align,
        icon: $q.iconSet.editor.align,
        fixedLabel: true,
        options: ['left', 'center', 'right', 'justify']
      }
    ],
    ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
    ['token', 'hr', 'link', 'custom_btn'],
    ['print', 'fullscreen'],
    [
      {
        label: $q.lang.editor.formatting,
        icon: $q.iconSet.editor.formatting,
        list: 'no-icons',
        options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code']
      },
      {
        label: $q.lang.editor.fontSize,
        icon: $q.iconSet.editor.fontSize,
        fixedLabel: true,
        fixedIcon: true,
        list: 'no-icons',
        options: [
          'size-1',
          'size-2',
          'size-3',
          'size-4',
          'size-5',
          'size-6',
          'size-7'
        ]
      },
      {
        label: $q.lang.editor.defaultFont,
        icon: $q.iconSet.editor.font,
        fixedIcon: true,
        list: 'no-icons',
        options: [
          'default_font',
          'arial',
          'arial_black',
          'comic_sans',
          'courier_new',
          'impact',
          'lucida_grande',
          'times_new_roman',
          'verdana'
        ]
      },
      'removeFormat'
    ],
    ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

    ['undo', 'redo'],
    ['viewsource']
  ];

  return { toolbar, font };
}
