import React, { useEffect, useState } from "react";
import { BlockData, PaginationData, Settings, Transaction} from "./types"
import { fetchBlocks, fetchLatestBlockTransactions } from "./functions/fetchBlock";
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import TablePagination, { TablePaginationProps } from '@mui/material/TablePagination';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    tableContainer: {
      marginTop: 20,
      marginBottom: 20,
    },
  });

const settings: Settings = {network: process.env.REACT_APP_NETWORK, apiKey: process.env.REACT_APP_API_KEY}

const EthereumBlocks: React.FC = () => {
    const [blocks, setBlocks] = useState<BlockData[]>([]);
    const [latestBlockTxs, setLatestBlockTxs] = useState<Transaction[]>([]);
    const [pageBlocks, setPageBlocks] = useState<number>(0);
    const [paginationDataBlocks, setPaginationDataBlocks] = useState<PaginationData>({ page: 0, rowsPerPage: 10 });
    const [pageTransactions, setPageTransactions] = useState<number>(0);
    const [paginationDataTransactions, setPaginationDataTransactions] = useState<PaginationData>({ page: 0, rowsPerPage: 10 });
    //const [latestChainData, setlatestChainData] = useState();

    useEffect(() => {
        const getBlocks = async () => {
            const blockData = await fetchBlocks(settings)
            setBlocks(blockData);
        };
        const getLatestBlock = async (b: BlockData[]) => {
            const latestBlockTransactions = await fetchLatestBlockTransactions(settings, b);
            console.log(latestBlockTransactions);
            setLatestBlockTxs(latestBlockTransactions);
        };

        getBlocks();
        getLatestBlock(blocks);
    }, [])

    const emptyRowsBlocks = paginationDataBlocks.rowsPerPage - Math.min(paginationDataBlocks.rowsPerPage, blocks.length - pageBlocks * paginationDataBlocks.rowsPerPage);
    const emptyRowsTransactions = paginationDataTransactions.rowsPerPage - Math.min(paginationDataTransactions.rowsPerPage, latestBlockTxs.length - pageTransactions * paginationDataTransactions.rowsPerPage);

    return (
        <div>
            <div style={{ display: 'inline-block', padding: '10px' }}>
                <h2>Lastest Blocks</h2>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Block Number</TableCell>
                                <TableCell>Timestamp</TableCell>
                                <TableCell>Transactions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* Map over the blocks array with the current page and rowsPerPage */}
                            {blocks.slice(paginationDataBlocks.page * paginationDataBlocks.rowsPerPage, paginationDataBlocks.page * paginationDataBlocks.rowsPerPage + paginationDataBlocks.rowsPerPage).map((block, index) => {
                                return (
                                    <TableRow key={index}>
                                    <TableCell>{block.blockNumber}</TableCell>
                                    <TableCell>{block.timestamp ? new Date(block.timestamp * 1000).toLocaleDateString('en-GB', { hour: 'numeric', minute: 'numeric', second: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' }) : "n/a"}</TableCell>
                                    <TableCell>{block.transactions}</TableCell>
                                    </TableRow>
                                );
                            })}
                            {/* Render an empty row if there are fewer rows than rowsPerPage */}
                            {emptyRowsBlocks > 0 && (
                            <TableRow style={{ height: 53 * emptyRowsBlocks }}>
                                <TableCell colSpan={3} />
                            </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    {/* Table pagination component */}
                    <TablePagination
                            component="div" // Set the root element of the component to div
                            count={blocks.length} // Total count is the length of the blocks array
                            rowsPerPage={paginationDataBlocks.rowsPerPage} // Rows per page is the current rowsPerPage value
                            page={paginationDataBlocks.page} // Current page is the current page value
                            onPageChange={(_event, newPage) => {
                                setPaginationDataBlocks(prevState => ({ ...prevState, page: newPage }));
                            }}
                            onRowsPerPageChange={(event) => {
                                setPaginationDataBlocks(prevState => ({ ...prevState, page: 0, rowsPerPage: parseInt(event.target.value, 10) }));
                            }}
                        />
                </TableContainer>
            </div>
            <div style={{ display: 'inline-block', padding: '10px' }}>
                <h2>Latest Transactions</h2>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Transaction Hash</TableCell>
                                <TableCell>From</TableCell>
                                <TableCell>To</TableCell>
                                <TableCell>Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {latestBlockTxs.slice(paginationDataTransactions.page * paginationDataTransactions.rowsPerPage, paginationDataTransactions.page * paginationDataTransactions.rowsPerPage + paginationDataTransactions.rowsPerPage).map((tx, index) => {
                                return (
                                <TableRow key={index}>
                                    <TableCell>{tx.hash ? `${tx.hash.substring(0, 8)}...${tx.hash.substring(tx.hash.length - 8)}` : "n/a"}</TableCell>
                                    <TableCell>{tx.from ? `${tx.from.substring(0, 8)}...${tx.from.substring(tx.from.length - 8)}` : "n/a"}</TableCell>
                                    <TableCell>{tx.to ? `${tx.to.substring(0, 8)}...${tx.to.substring(tx.to.length - 8)}` : "n/a"}</TableCell>
                                    <TableCell>{tx.amount?.toString()}</TableCell>
                                </TableRow>
                                );
                            })}
                            {/* Render an empty row if there are fewer rows than rowsPerPage */}
                            {emptyRowsTransactions > 0 && (
                            <TableRow style={{ height: 53 * emptyRowsTransactions }}>
                                <TableCell colSpan={3} />
                            </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    {/* Table pagination component */}
                    <TablePagination
                            component="div" // Set the root element of the component to div
                            count={latestBlockTxs.length} // Total count is the length of the blocks array
                            rowsPerPage={paginationDataTransactions.rowsPerPage} // Rows per page is the current rowsPerPage value
                            page={paginationDataTransactions.page} // Current page is the current page value
                            onPageChange={(_event, newPage) => {
                                setPaginationDataTransactions(prevState => ({ ...prevState, page: newPage }));
                            }}
                            onRowsPerPageChange={(event) => {
                                setPaginationDataTransactions(prevState => ({ ...prevState, page: 0, rowsPerPage: parseInt(event.target.value, 10) }));
                            }}
                        />
                </TableContainer>
            </div>
        </div>
    );
};

export default EthereumBlocks;