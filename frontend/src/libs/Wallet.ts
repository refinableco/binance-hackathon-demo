import { ethers } from 'ethers';
import { soliditySha3 } from 'web3-utils';
import {ENV} from "../env";
import refinableERC721TokenABI from './abis/refinableERC721Token.abi.json'

const erc721TokenContract = new ethers.Contract(
    ENV.TOKEN721_ADDRESS,
    refinableERC721TokenABI as any,
    // @ts-ignore
    undefined
);

export class Wallet {
    chain: any;
    nft: any;
    address: string;
    protected mintContractWithSigner: any;

    constructor(address: string, nft: any, chain: any, provider: any) {

        this.address = address;
        // TODO connect signer
        this.mintContractWithSigner = erc721TokenContract.connect(provider);
    }

    async mint(): Promise<any> {

        const approveMintSha3 = soliditySha3(
            this.nft.contractAddress,
            this.nft.tokenId,
            this.address,
        );

        const response = await this.chain.bnbSign(
            this.address,
            approveMintSha3,
        );

        const result = await this.mintContractWithSigner.mint(
            this.nft.tokenId,
            response.signature,
            ''
        );

        return result;
    }

}
