import { rehydrateOrCreateDB } from "./connection"
const erc721_metadata = 'erc721_metadata';
const MAX_VALUE = 10000000;
const MIN_VALUE = 100;

export const findByTokenId = async (tokenId: string) => {
    const db = await rehydrateOrCreateDB();
    return db.collection(erc721_metadata).findOne({ tokenId });
};


export const getLastTokenId = async () => {
    return Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1) + MIN_VALUE)
};

export const getAll = async () => {
    const db = await rehydrateOrCreateDB();
    return db.collection(erc721_metadata).find().toArray()
};

export const create = async (payload: Record<string, any>) => {
    const db = await rehydrateOrCreateDB();
    const result = await db.collection(erc721_metadata).insertOne(payload);
    return result.ops[0];
}

export default {
    create,
    getAll,
    findByTokenId,
    getLastTokenId
}
