import React, { useEffect, useState } from "react";
import { BlockData, Settings} from "./types"
import { fetchBlocks } from "./functions/fetchBlocks";
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';


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
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Block Number</TableCell>
                        <TableCell>Timestamp</TableCell>
                        <TableCell>Transactions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {blocks.map((block) => {
                        return (
                        <TableRow key={block.blockNumber}>
                            <TableCell>{block.blockNumber}</TableCell>
                            <TableCell>{block.timestamp ? new Date(block.timestamp * 1000).toLocaleDateString('en-GB', {hour: 'numeric', minute: 'numeric', second: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric'}) : "n/a"}</TableCell>
                            <TableCell>{block.transactions}</TableCell>
                        </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            </div>
    );
};

export default EthereumBlocks;