import dotenv from "dotenv";
dotenv.config();

import EigenEvents from "./EigenEvents.js";
import Web3 from "web3";
import { createClient } from "@supabase/supabase-js";
import tokenConfig from "./lib/tokenConfig.json" with { type: "json" };
import { Decimal } from "decimal.js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const rpcUrl = process.env.ALCHEMY_RPC_URL;
const eigenEventsHistoric = new EigenEvents(rpcUrl, "http");
const web3 = new Web3(rpcUrl);

const fromBlock = 19492759;
const toBlock = 19692759;
let currentBlock = fromBlock;
const latestBlock = await web3.eth.getBlockNumber();
const blockInterval = 2000;
let operatorData = [];
const stakerData = new Set();

// Function to convert shares to amount in Ether using decimal.js
function convertSharesToAmount(shares) {
    const gweiPerEther = new Decimal('1e18');
    const sharesDecimal = new Decimal(shares.toString());
    const amountInEther = sharesDecimal.div(gweiPerEther);
    return amountInEther.toFixed(18);
}

async function handleEventInsertion(event) {
    try {
        // Convert token address to token name
        const tokenName = tokenConfig[event.returnValues.token] || "UnknownToken";

        // Convert shares to amount (in ether)
        const amount = convertSharesToAmount(event.returnValues.shares);

        // Save deposit event to Supabase
        const { data, error } = await supabase
            .from("deposits")
            .insert([
                {
                    transaction_hash: event.transactionHash.toString(),
                    block_number: event.blockNumber.toString(),
                    staker_addr: event.returnValues.staker,
                    token: tokenName,
                    strategy_addr: event.returnValues.strategy,
                    amount: amount,
                    message: event.message
                },
            ]);

        if (error) {
            console.log(`Error adding event to Supabase happened at block: ${event.blockNumber}`, error);
        } else {
            console.log("Event added to Supabase successfully!");
        }
    } catch (e) {
        console.error(`Exception during insertion of event from block: ${event.blockNumber}`, e);
    }
}

export async function calculateStrategyDeposits() {
    let totalDeposits = BigInt(0);

    while (currentBlock < toBlock) {
        try {
            const depositEvents = await eigenEventsHistoric.getDepositEvents(
                currentBlock, 
                currentBlock + blockInterval
            );
            currentBlock += blockInterval;
            for (const event of depositEvents) {
                const shares = BigInt(event.returnValues.shares);
                if (shares !== undefined) {
                    totalDeposits += shares;
                    await handleEventInsertion(event);  // Ensure each insertion is awaited
                }
            }
            await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (error) {
            console.error(`Error fetching events from block ${currentBlock - blockInterval} to ${currentBlock}:`, error);
        }
    }

    const totalDepositsInEther = convertSharesToAmount(totalDeposits);
    console.log(`Final Total Deposits: ${totalDepositsInEther}`);
    return totalDepositsInEther;  // Ensure the total deposits are returned
}

// Call the function to test and log results
calculateStrategyDeposits().catch(console.error);
