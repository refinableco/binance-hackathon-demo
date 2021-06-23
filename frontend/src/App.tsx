import React from 'react';
import {Header} from "./components/Header";
import {Route, Switch} from "react-router";
import {Overview} from "./pages/Overview";
import {CreateNFT} from "./pages/CreateNFT";

export const App: React.FC = () => {

    return (
        <>
            <Header />
            <div className="content">
                <Switch>
                    <Route exact path="/" component={Overview} />
                    <Route exact path="/create" component={CreateNFT} />
                </Switch>
            </div>

        </>
    )
}
