import {Ticker} from "@coingecko/cg-api-ts";

export interface TelegramPayload {
    update_id: number
    message?: TelegramMessage
    edited_message?: TelegramMessage
}

export interface TelegramMessage {
    message_id: number
    from: TelegramUser
    forward_from: TelegramUser
    forward_from_message_id: number
    chat: TelegramChat
    forward_from_chat: TelegramChat
    date: number
    text: string
    entities: MessageEntity[]
}

export interface TelegramChat {
    id: number
    first_name: string
    last_name: string
    username: string
}

export interface TelegramListener {
    chat: TelegramChat
    network: string
    delegate: string
}

export interface TelegramUser {
    id: number
    is_bot: boolean
    first_name: string
    last_name: string
    username: string
    language_code: string
    can_join_groups: boolean
    can_read_all_group_messages: boolean
    supports_inline_queries: boolean
}

export interface MessageEntity {
    type: string
    offset: number
    length: number
    url: string
    language: string
    user: TelegramUser
}

export interface Market {
    ethPrice: number
    usdPrice: number
    change24h: number
    change7d: number
    change30d: number
    totalVolumeInUsd: number
    marketCapUsd: number
    holdersCount: number
    contractAddress: string | undefined
    tickers: Ticker[]
}
