export interface BlockData {
    blockNumber: number | undefined,
    timestamp: number | undefined,
    transactions: number | undefined,
    transactionHashes: string[] | undefined
}

export interface Settings {
    network?: string | undefined,
    apiKey?: string | undefined,
    url?: string
}

export interface Transaction {
    from: string | null | undefined,
    to: string | null | undefined,
    amount: bigint | undefined,
    hash: string | null | undefined
}

export interface PaginationData {
    page: number,
    rowsPerPage: number
  }