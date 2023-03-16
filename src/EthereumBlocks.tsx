import React, { useEffect, useState } from "react";
import { AlchemyProvider}  from "ethers";
import { BlockData, Settings} from "./types"
import { fetchBlocks } from "./functions/fetchBlocks";

const settings: Settings = {network: process.env.REACT_APP_NETWORK, apiKey: process.env.REACT_APP_API_KEY}

const EthereumBlocks: React.FC = () => {
    const [blocks, setBlocks] = useState<BlockData[]>([]);

    useEffect(() => {
        const getBlocks = async () => {
            const blockData = await fetchBlocks(settings)
            setBlocks(blockData);
        };

        getBlocks();
    }, [])

    return (
        <div>
            <h2>Last 10 Blocks</h2>
            <table>
            <thead>
                    <tr>
                        <th>Block Number</th>
                        <th>Timestamp</th>
                        <th>Transactions</th>
                    </tr>
                </thead>
                <tbody>
                    {blocks.map((block) => {
                        return (
                        <tr key={block.blockNumber}>
                            <td>{block.blockNumber}</td>
                            <td>{block.timestamp ? new Date(block.timestamp * 1000).toLocaleDateString() : "n/a"}</td>
                            <td>{block.transactions}</td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
            </div>
    );
};

export default EthereumBlocks;