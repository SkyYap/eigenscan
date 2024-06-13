import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from "dotenv";
dotenv.config();

import "./config/email.js";
import { sendEmail } from './config/email.js';
import { asyncHandler } from './middleware/asyncErrorHandler.js';
import {
    GetAVSStats,
    GetAVSMetadata,
    GetCombinedAVSData,
    GetOperators,
    GetOperatorStats,
    GetOperatorMetadata,
    GetCombinedOperatorsData
} from './config/eigenlayer.js';

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors()); 

// Endpoint to get AVS stats
app.post('/avs-stats-dune', async (req, res) => {
    const { limit, sortBy, nextUri } = req.query;
    try {
        const data = await GetAVSStats(parseInt(limit) || 10, sortBy || 'num_operators desc', nextUri || '');
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to get AVS metadata
app.post('/avs-metadata-dune', async (req, res) => {
    const { avsAddresses } = req.query;
    const addresses = avsAddresses ? avsAddresses.split(',') : [];
    try {
        const data = await GetAVSMetadata(addresses);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to get combined AVS data
app.post('/combined-avs-data-dune', async (req, res) => {
    const { limit, offset, sortBy, nextUri } = req.query;
    try {
        const data = await GetCombinedAVSData(parseInt(limit) || 8, parseInt(offset) || 0, sortBy || 'num_operators desc', nextUri || '');
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to get operators for an AVS address
app.post('/operators-dune', async (req, res) => {
    const { avsAddress } = req.query;
    try {
        const data = await GetOperators(avsAddress);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to get operator stats
app.post('/operator-stats-dune', async (req, res) => {
    const { operatorAddresses } = req.query;
    const addresses = operatorAddresses ? operatorAddresses.split(',') : [];
    try {
        const data = await GetOperatorStats(addresses);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to get operator metadata
app.post('/operator-metadata-dune', async (req, res) => {
    const { operatorAddresses } = req.query;
    const addresses = operatorAddresses ? operatorAddresses.split(',') : [];
    try {
        const data = await GetOperatorMetadata(addresses);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to get combined operator data for an AVS address
app.post('/combined-operators-data-dune', async (req, res) => {
    const { avsAddress, batchStart, batchSize } = req.query;
    try {
        const data = await GetCombinedOperatorsData(avsAddress, parseInt(batchStart) || 0, parseInt(batchSize) || 10);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to test send email
app.post('/send-email', asyncHandler(async (req, res) => {
    const { emailAddress } = req.body;
  
    if (!emailAddress) {
        return res.status(400).json({ error: 'Email address is required' });
    }
  
    const response = await sendEmail(emailAddress);
    res.json({ message: 'Email sent successfully', response });
}));

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
