import React, {useEffect, useState} from 'react';
import {Form, Input, Button, Slider} from 'antd';
import {NFTImage} from "../components/NFTImage";
import {ethers} from 'ethers';
import {useWallet} from "use-wallet/dist/cjs";
import {useHistory} from "react-router";
import {soliditySha3} from "web3-utils";
import {ENV} from "../env";
import refinableERC721TokenABI from "../libs/abis/refinableERC721Token.abi.json";
import {
    useWeb3React,
} from '@web3-react/core'

const MAX_VALUE = 100000;
const MIN_VALUE = 1;

const layout = {
    labelCol: { span: 8 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

interface NFT {
    chromosomeX: number
    chromosomeY: number
}

export const CreateNFT = () => {

    const wallet = useWallet();
    const web3React = useWeb3React();
    const history = useHistory();
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [selectedItem, setSelectedItem] = useState<NFT>();
    const [items, setItems] = useState<NFT[]>([]);

    useEffect(() => {
        generateNfts();
    }, [])

    function generateNfts () {
        let generatedItems = [];
        for (let i = 0; i < 8; i++) {
            generatedItems.push({
                chromosomeX: Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1) + MIN_VALUE),
                chromosomeY: Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1) + MIN_VALUE)
            })
        }
        setItems(generatedItems);
        setSelectedItem(undefined);
    }

    const onFinish = async (values: any) => {

        const createResponse = await fetch('http://localhost:3333/metadata', {
            method: 'post',
            body: JSON.stringify({ ...values, createdBy: wallet.account, ...selectedItem })
        })

        let tokenId;
        if (createResponse.ok) {
            const data = await createResponse.json();
            tokenId = data.tokenId;
        }

        const provider = new ethers.providers.Web3Provider(web3React.library);
        const erc721TokenContract = new ethers.Contract(
            ENV.TOKEN721_ADDRESS,
            refinableERC721TokenABI as any,
            provider.getSigner(wallet.account as string)
        );

        const contract = await erc721TokenContract.connect(provider.getSigner(wallet.account as string));

        const approveMintSha3 = soliditySha3(
            ENV.TOKEN721_ADDRESS,
            tokenId,
            wallet.account as string,
        );

        const signature = await wallet.ethereum.request({
            method: "personal_sign",
            params: [approveMintSha3, wallet.account],
            jsonrpc: "2.0",
            id: new Date().getTime(),
        });

        await contract.mint(
            tokenId,
            signature,
            'http://localhost:3333'
        );


        history.push('/')
    };

    if (!wallet.account) {
        return (
            <div className="create-nft">
                Please authenticate
            </div>
        )
    }

    return (
        <div className="create-nft">
            <header>
                <h1>Create 721 Token</h1>
                <p>Easily create a 721 token with built-in rarity</p>
            </header>
            <Form {...layout} name="nest-messages" layout="vertical" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                    <Input onChange={(event) => setName(event.target.value)} />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input.TextArea onChange={(event) => setDescription(event.target.value)} />
                </Form.Item>
                <div className="select-nft">
                    <div className="select-nft--header">
                        <div>
                            <h2>Select the NFT you want to create</h2>
                            <p>We created some unique NFT's for you. Don't like them? Try our randomizer on the right!</p>
                        </div>
                        <div>
                            <Button type="primary" onClick={generateNfts}>Randomize</Button>
                        </div>
                    </div>
                    <div className="generated-nft-wrap">
                        {
                            items.map((item: NFT) => {
                                const isActive = selectedItem && selectedItem.chromosomeX === item.chromosomeX && selectedItem.chromosomeX === item.chromosomeX
                                const data = item.chromosomeX + item.chromosomeY + '';
                                return <div onClick={() => setSelectedItem(item)} className={`overview-item`}>
                                   <div className={isActive ? 'active' : 'not-active'}> <NFTImage size={100} data={data} /></div>
                                </div>;
                            })
                        }
                    </div>
                </div>
                <div className="form-submit">

                    <Button disabled={!name || !description || !selectedItem} type="primary" htmlType="submit">
                        Create
                    </Button>
                </div>
            </Form>
        </div>
    )
}
