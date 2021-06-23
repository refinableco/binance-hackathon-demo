import { rehydrateOrCreateDB } from "./connection"
const erc721_metadata = 'erc721_metadata';

export const findByTokenId = async (tokenId: string) => {
    const db = await rehydrateOrCreateDB();
    return db.collection(erc721_metadata).findOne({ tokenId });
};


export const getLastTokenId = async () => {
    const db = await rehydrateOrCreateDB();
    const count = await db.collection(erc721_metadata).count();
    return count + 1;
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
