import dotenv from "dotenv";
dotenv.config();

import PufferEvents from "./PufferEvents.js";
import Web3 from "web3";
import { createClient } from "@supabase/supabase-js";
import BN from "bn.js";

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
const pufferEventsHistoric = new PufferEvents(rpcUrl, "http");
const web3 = new Web3(rpcUrl);

const fromBlock = 19492759; 
const toBlock = "latest";
const blockInterval = 1000;

// Function to calculate the total value locked (TVL)
async function calculateTVL() {
    let totalDeposits = new BN(0);
    let totalWithdrawals = new BN(0);

    try {
        const depositEvents = await pufferEventsHistoric.getDeposit(fromBlock, toBlock);
        depositEvents.forEach((event) => {
            totalDeposits = totalDeposits.add(Web3.utils.toBN(event.returnValues.amount));
        });

        const withdrawalEvents = await pufferEventsHistoric.getWithdrawal(fromBlock, toBlock);
        withdrawalEvents.forEach((event) => {
            totalWithdrawals = totalWithdrawals.add(Web3.utils.toBN(event.returnValues.amount));
        });

        const tvl = totalDeposits.sub(totalWithdrawals);
        return web3.utils.fromWei(tvl, "ether");
    } catch (error) {
        console.error("Error calculating TVL: ", error);
        return "0";
    }
}

async function fetchKPIs() {
    let currentBlock = fromBlock;
    const latestBlock = await web3.eth.getBlockNumber();
    let tvlData = "0";
    let numValidators = 0;
    let validatorChurnRate = 0;
    const stakerData = new Set();

    // Number of Registered Validators
    try {
        console.log("Fetching Validator data...");
        const validatorEvents =
            (await pufferEventsHistoric.getValidatorKeyRegistered(fromBlock, toBlock)) || [];
        numValidators = validatorEvents.length;
        console.log("Number of Validators: ", numValidators);
    } catch (error) {
        console.error("Error fetching Validator events: ", error);
    }

    // Insert data into Supabase
    const { data, error } = await supabase
        .from("pufferdata")
        .insert([
            {
                number_validators: numValidators.toString(),
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
