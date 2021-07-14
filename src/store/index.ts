import { store } from 'quasar/wrappers';
import { createStore, Store as VuexStore, useStore as vuexUseStore } from 'vuex';
import { LocalStorage } from 'quasar';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export interface IUnit {
  rate: number;
  dp: number;
}

export interface StateInterface {
  version: number;
  loading: boolean;
  UNITS: any;
  pushToken: string;
  witnessOnline: boolean;
  account:
    | { merchant: 'handcash' | 'moneybutton' | 'relayx'; authToken: string; refreshToken?: string; payload?: any ;accountName:string}
    | undefined;
}

// provide typings for `this.$store`
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: VuexStore<StateInterface>;
  }
}

export default store(function (/* { ssrContext } */) {
  const Store = createStore<StateInterface>({
    state: {
      version: 1,
      loading: false,
      UNITS: {
        BSV: { rate: 1, dp: 8 },
        BITS: { rate: 1e6, dp: 2 },
        SATS: { rate: 1e8, dp: 0 },
        USD: { rate: 0, dp: 2 },
        CNY: { rate: 0, dp: 2 },
        JPY: { rate: 0, dp: 0 },
      },
      pushToken: '', // FCM Token，使用Firebase Messaging
      witnessOnline: false,
      account: undefined,
    },
    getters: {
      convertUnit(state) {
        return function (
          from: string,
          to: string,
          amountStr: string,
          comma: boolean = false,
          dp: number = 2,
          units: { [key: string]: IUnit } | undefined = undefined
        ): string | undefined {
          const amount: number = parseFloat(amountStr);
          if (isNaN(amount)) {
            return '';
          }
          let fromUnit: IUnit, toUnit: IUnit;
          if (units) {
            fromUnit = units[from];
            toUnit = units[to];
            if (!fromUnit || !toUnit) return '';
          } else {
            fromUnit = state.UNITS[from];
            toUnit = state.UNITS[to];
          }
          if (!(fromUnit && toUnit && fromUnit.rate && toUnit.rate)) {
            return undefined;
          }
          let result: string = ((amount / fromUnit.rate) * toUnit.rate).toFixed(toUnit.dp || dp);
          if (comma) {
            const p: string[] = result.split('.');
            p[0] = p[0]
              .split('')
              .reverse()
              .join('')
              .match(/\d{1,3}-?/g)!
              .join(',')
              .split('')
              .reverse()
              .join('');
            result = p.join('.');
          }
          return result;
        };
      },
      supportedCryptoUnits(state): string[] {
        return Object.keys(state.UNITS).slice(0, 3);
      },
      supportedCurrencies(state): string[] {
        return Object.keys(state.UNITS).slice(3);
      },
    },
    mutations: {
      setState(state, rootState) {
        state = Object.assign(state, rootState);
      },
      setAccount(state, account) {
        state.account = account;
      },
    },
    actions: {
      async initLocalState({ state, dispatch, commit }) {
        const rootState = LocalStorage.getItem('rootState') ?? {};
        commit('setState', rootState);
      },
      setAccount({ commit, dispatch }, val) {
        commit('setAccount', val);
        dispatch('saveRootState');
      },
      saveRootState({ rootState }) {
        LocalStorage.set('rootState', rootState);
      },
    },
    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: !!process.env.DEBUGGING,
  });
  return Store;
});

export function useStore() {
  return vuexUseStore();
}
