import { boot } from 'quasar/wrappers';
import emitter from 'tiny-emitter/instance';

Number.prototype.toSatoshi = function () {
  return (this as number) * 10 ** 8;
};

Number.prototype.toCurrency = function (rate: number) {
  return (this as number) * rate;
};

Number.prototype.toBSV = function () {
  return (this as number) / 10 ** 8;
};

Number.prototype.toLocal = function () {
  return (this as number).toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 8,
  });
};

String.prototype.toNoCommaNumber = function () {
  return Number(this.replace(/,/g, ''));
};

declare global {
  interface Window {
    eventHub: any;
    moneyButton: any;
    relayone: any;
    query: any;
  }
}

export default boot(async ({ app, store }) => {
  window.eventHub = eventHub;
  await store.dispatch('initLocalState');
});

export const eventHub = {
  $on: (...args) => emitter.on(...args),
  $once: (...args) => emitter.once(...args),
  $off: (...args) => emitter.off(...args),
  $emit: (...args) => emitter.emit(...args),
};
