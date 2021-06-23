import React, {FC} from "react";
import {Item} from "../types/types";
import {NFTImage} from "../components/NFTImage";

interface Props {
    item: Item
}

export const OverviewItem: FC<Props> = ({ item }) => {
    return (
        <div className="overview-item">
            <NFTImage data={item?.chromosomeX + item?.chromosomeY + ''} />
            <div className="overview-item--info">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
            </div>
        </div>
    )
}
