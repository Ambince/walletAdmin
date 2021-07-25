
import Client from '@walletconnect/client';
import { SessionTypes } from '@walletconnect/types';
import { ERROR } from '@walletconnect/utils';

import KeyValueStorage from 'keyvaluestorage';
import { useQuasar } from 'quasar';
import { StateInterface } from 'src/store';
import { DEFAULT_RELAY_PROVIDER, AppState } from 'src/utils';
import { onMounted, reactive } from 'vue';
import { useStore, Store } from 'vuex';
import { LocalStorage, SessionStorage } from 'quasar'

const dataWC = reactive<IWalletConnect>({
    accounts: [],
    client: undefined,
    session: undefined,
});

interface IWalletConnect {
    accounts: string[];
    client: Client | undefined;
    session: SessionTypes.Created | undefined;

}

export default function useWalletConnect(
    globalUse: boolean = false,
    initializedCallBack: () => void = () => { },
    store?: Store<StateInterface>
) {
    const $q = useQuasar();
    if (!store) store = useStore<StateInterface>();

    const resetConnect = () => {
        dataWC.accounts = [];
        dataWC.client = undefined;
        dataWC.session = undefined;
    }
    const initConnect = (data: AppState) => {
        dataWC.accounts = data.accounts;
        dataWC.client = data.client;
        dataWC.session = data.session;
    }
    const disconnect = async (topic: string) => {
        console.log('ACTION', 'disconnect');
        if (typeof dataWC.client === 'undefined') {
            throw new Error('Client is not initialized');
        }
        await dataWC.client.disconnect({
            topic,
            reason: ERROR.USER_DISCONNECTED.format(),
        });
        resetConnect();
        LocalStorage.clear();

    };

    if (globalUse) {
        onMounted(async () => {
            if (!dataWC.client) {
                const storage = new KeyValueStorage();
                dataWC.client = await Client.init({
                    controller: true,
                    relayProvider: DEFAULT_RELAY_PROVIDER,
                    storage,
                });
            }
            initializedCallBack();
        });
    }

    return {
        dataWC,
        disconnect,
        resetConnect,
        initConnect
    };
}
