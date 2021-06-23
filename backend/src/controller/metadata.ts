import repository from '../repository/metadata'
import {successResponse} from "./http/responses";

export const getByTokenId = async (event: any, context: any, func: any) => {
    context.callbackWaitsForEmptyEventLoop = false;
    return successResponse();
};

export const getAll = async (event: any, context: any, func: any) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const items = await repository.getAll();
    return successResponse(items);
};

export const create = async (event: any, context: any, func: any) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const payload = JSON.parse(event.body);
    await repository.create(payload)
    const tokenId = await repository.getLastTokenId();
    return successResponse({ tokenId });
};
