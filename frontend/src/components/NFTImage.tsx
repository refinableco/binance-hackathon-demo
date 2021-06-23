import React, {FC} from "react";
import Identicon from "react-identicons";

interface Props {
    size?: number
    data: string
}

export const NFTImage: FC<Props> = ({ data, size= 150 }) => {
    const outerSize = size + 20;
    return (
        <div className="nft-card-image" style={{ width: outerSize, height: outerSize }}>
            <Identicon string={data} size={size} padding={4} />
        </div>
    )
}
