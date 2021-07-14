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
