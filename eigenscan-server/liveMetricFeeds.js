import dotenv from "dotenv";
dotenv.config();

import EigenEvents from "./EigenEvents.js";
import Web3 from "web3";
import { createClient } from "@supabase/supabase-js";
import { calculateStrategyDeposits } from "./DepositFeeds.js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

let { signInData, signInError } = await supabase.auth.signInWithPassword({
    email: process.env.EMAIL_ID,
    password: process.env.PASSWORD,
});
if (signInError) {
    console.log(signInError.message);
} else {
    console.log("Signed in...");
}

const rpcUrl = process.env.ALCHEMY_RPC_URL;
const eigenEventsHistoric = new EigenEvents(rpcUrl, "http");
const web3 = new Web3(rpcUrl);

const fromBlock = 19492759;
const toBlock = "latest";
const blockInterval = 2000;

async function fetchKPIs() {
    let currentBlock = fromBlock;
    const latestBlock = await web3.eth.getBlockNumber();
    let avsData = [];
    let operatorData = [];
    const stakerData = new Set();

    // TVL
    let tvldata = "0";
    try {
        console.log("Fetching TVL data...");
        const totalDepositsInEther = await calculateStrategyDeposits();
        tvldata = totalDepositsInEther;
        console.log("Total Deposits in Ether: ", totalDepositsInEther);
    } catch (error) {
        console.error("Error calculating TVL data: ", error);
    }

    // No of AVSs
    try {
        console.log("Fetching AVS data...");
        const uniqueMetadataURIs = new Set();
        const historicalAVSData =
            (await eigenEventsHistoric.getAVSMetadataURIUpdatedEvents(fromBlock, toBlock)) || [];
        avsData = historicalAVSData.filter((event) => {
            const avs = event.returnValues.avs;
            const metadataURI = event.returnValues.metadataURI;
            if (!stakerData.has(avs) && !uniqueMetadataURIs.has(metadataURI)) {
                stakerData.add(avs);
                uniqueMetadataURIs.add(metadataURI);
                return true;
            }
            return false;
        });
        console.log("No of AVSs: ", avsData.length);
    } catch (error) {
        console.error("Error fetching AVS events: ", error);
    }

    // No of Operators
    try {
        console.log("Fetching Operator data...");
        operatorData =
            (await eigenEventsHistoric.getOperatorRegisteredEvents(fromBlock, toBlock)) || [];
        console.log("No of Operators: ", operatorData.length);
    } catch (error) {
        console.error("Error fetching Operator events: ", error);
    }

    // No of Stakers
    console.log("Fetching Staker data...");
    while (currentBlock < latestBlock) {
        try {
            const eventData =
                (await eigenEventsHistoric.getDepositEvents(
                    currentBlock,
                    currentBlock + blockInterval,
                )) || [];
            currentBlock += blockInterval;

            eventData.forEach((event) => {
                const staker = event.returnValues.staker;
                stakerData.add(staker);
            });
            await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (error) {
            console.error("Error fetching Deposit events:", error);
        }
    }
    console.log("No of Stakers: ", stakerData.size);

    const { data, error } = await supabase
        .from("eigendata")
        .insert([
            {
                tvl_eth: tvldata.toString(),
                number_avs: avsData.length.toString(),
                number_operator: operatorData.length.toString(),
                number_staker: stakerData.size.toString(),
            },
        ])
        .select();
    if (!error) {
        console.log("Added to DB: ", data);
    } else {
        console.log("Error adding to DB: ", error);
    }
}

fetchKPIs().catch(console.error);
