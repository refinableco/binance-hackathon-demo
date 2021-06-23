import React from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from 'use-wallet/dist/cjs';
import {Button} from "antd";
import JazzIcon from 'react-jazzicon';
import {getShortAddress, jsNumberForAddress} from "../utils/bsc.utils";

export const Header: React.FC = () => {
    const wallet = useWallet()

    async function authenticate () {
        await wallet.connect('injected');
    }

    return (
        <div className="header-wrap">
            <div className="header">
                <div>Binance Africa Demo by <b>Refinable</b></div>
                <div className="menu-right">
                {
                    wallet.account
                    ? (
                            <>
                                <Link to="/">Home</Link>
                                <Link to="/create">Create</Link>
                                <div className="menu-right">
                                    <JazzIcon
                                        diameter={25}
                                        seed={jsNumberForAddress(wallet.account)}
                                    />
                                    <div style={{ marginLeft: 15 }}>{getShortAddress( 10, wallet.account)}</div>
                                </div>
                            </>
                        )
                     :   (
                            <Button type="primary" onClick={authenticate}>Connect</Button>
                        )
                }
                </div>
            </div>
        </div>
    )
}
