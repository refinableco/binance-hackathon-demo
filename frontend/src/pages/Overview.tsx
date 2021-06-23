import React, {useEffect, useState} from 'react';
import {NFTImage} from "../components/NFTImage";
import {OverviewItem} from "./OverviewItem";

export const Overview = () => {

    const [items, setItems] = useState<any[]>();

    useEffect(() => {
        async function fetchData () {
           const response = await fetch('http://localhost:3333/metadata');
           if (response.ok) {
               const items = await response.json()
               setItems(items);
           }
        }
        fetchData();
    }, [])

    return (
        <div>
            <div className="overview-header">
                <h1>ERC721 Overview</h1>
                <p>An collection of all created tokens</p>
            </div>
            <div className="overview-wrap">
                {items?.map(item => <OverviewItem item={item} />)}
            </div>
        </div>
    )
}
