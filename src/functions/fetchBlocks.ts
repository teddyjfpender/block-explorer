import { BlockData, Settings} from "../types"
import { AlchemyProvider } from "ethers"

export async function fetchBlocks(settings: Settings): Promise<BlockData[]> {
    const provider = new AlchemyProvider(settings.network, settings.apiKey)
    const currentBlock = await provider.getBlockNumber();
    const blockNumbers = Array.from({ length: 10}, (_, i) => currentBlock - i);

    const blockData = await Promise.all(
        blockNumbers.map( async (blockNumber) => getBlockData(provider, blockNumber)),
    );
    return blockData;
}

async function getBlockData(provider: AlchemyProvider, blockNumber: number): Promise<BlockData> {
        const block = await provider.getBlock(blockNumber)
        return {
            blockNumber: block?.number,
            timestamp: block?.timestamp,
            transactions: block?.transactions.length,                
        };
};