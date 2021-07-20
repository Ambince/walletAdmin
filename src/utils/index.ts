import Client, { } from "@walletconnect/client";

import { SessionTypes } from "@walletconnect/types";

export function validatePaymail(text: string): boolean {
  return text.match(/^[^@:]+@[^@]+\.[^@]+$/g) ? true : false;
}

export const DEFAULT_RELAY_PROVIDER = 'wss://wc.cercle.sg';
export const CHAIN_ID = 'bsv:livenet';

export const DEFAULT_LOGGER = 'debug';
export const DEFAULT_METHODS = {
  getBalance: 'getBalance',
  pay: 'pay',
  signOutputsAndBroadcast: 'signOutputsAndBroadcast',
};

// export const backServerUrl = 'http://127.0.0.1:8088';
export const backServerUrl = 'http://139.162.125.233:8088';
// export const backServerUrl = 'http://121.43.41.7:8088';


export interface AppState {
  client: Client | undefined;
  session: SessionTypes.Created | undefined;
  accounts: string[];
}

export const INITIAL_STATE: AppState = {
  client: undefined,
  session: undefined,
  accounts: [],
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



