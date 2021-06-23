import ReactDOM from 'react-dom';
import {App} from "./App";

import './style.less';

import bsc from '@binance-chain/bsc-use-wallet'
import { UseWalletProvider} from "use-wallet/dist/cjs";
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <UseWalletProvider
        chainId={97}
        connectors={{ bsc }}
    >
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </UseWalletProvider>,
    document.getElementById('root'));
