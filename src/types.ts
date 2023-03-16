export interface BlockData {
    blockNumber: number | undefined,
    timestamp: number | undefined,
    transactions: number | undefined
}

export interface Settings {
    network: string | undefined,
    apiKey: string | undefined,
}
