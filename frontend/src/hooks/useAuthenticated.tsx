import React, {useMemo} from 'react';
import {useWallet} from "use-wallet/dist/cjs";

export const useAuthenticated = () => {
    const wallet = useWallet();

    async function connect () {
        const xx = await wallet.connect('injected');
    }

    return useMemo(() => ({
        wallet,

    }), [wallet])
}
