import { BlockData, Transaction, Settings} from "../types"
import { AlchemyProvider } from "ethers"

export async function fetchBlocks(settings: Settings): Promise<BlockData[]> {
    const provider = new AlchemyProvider(settings.network, settings.apiKey)
    const currentBlock = await provider.getBlockNumber();
    const blockNumbers = Array.from({ length: 20}, (_, i) => currentBlock - i);

    const blockData = await Promise.all(
        blockNumbers.map( async (blockNumber) => getBlockData(provider, blockNumber)),
    );
    return blockData;
}

async function getBlockData(provider: AlchemyProvider, blockNumber: number): Promise<BlockData> {
        const block = await provider.getBlock(blockNumber)
        const transactionsHashes = Array.from(block?.transactions || []);
        return {
            blockNumber: block?.number,
            timestamp: block?.timestamp,
            transactions: block?.transactions.length,
            transactionHashes: [...transactionsHashes]
        };
};

export async function fetchLatestBlockTransactions(settings: Settings, fetchedBlocks: BlockData[]): Promise<Transaction[]> {
    const provider = new AlchemyProvider(settings.network, settings.apiKey)
    const latestBlock = fetchedBlocks.shift();
    const latestBlockTransactions = latestBlock?.transactionHashes;
    
    const transactions = await Promise.all(
        latestBlockTransactions ? latestBlockTransactions.map( async (txHash) => getTransactionData(provider, txHash)) : [{from: undefined, to: undefined, amount: undefined, hash: undefined}]
    );
    return transactions   
}

async function getTransactionData(provider: AlchemyProvider, transactionHash: string): Promise<Transaction> {
    const transaction = await provider.getTransaction(transactionHash)
    return {
        from: transaction?.from,
        to: transaction?.to,
        amount: transaction?.value,
        hash: transaction?.hash
    }
}