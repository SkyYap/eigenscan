/**
 * @swagger
 * tags:
 *   name: Dune
 *   description: API endpoints for Dune
 */

import express from 'express';
import {
    GetAVSStats,
    GetAVSMetadata,
    GetCombinedAVSData,
    GetOperators,
    GetOperatorStats,
    GetOperatorMetadata,
    GetCombinedOperatorsData
} from '../config/eigenlayer.js';
import duneAPIMiddleware from '../middleware/duneApiMiddleware.js';

const router = express.Router();

// Endpoint to get AVS stats
router.post('/avs-stats', duneAPIMiddleware, async (req, res) => {
    const { limit, sortBy, nextUri } = req.query;
    try {
        const data = await GetAVSStats(parseInt(limit) || 10, sortBy || 'num_operators desc', nextUri || '');
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to get AVS metadata
router.post('/avs-metadata', duneAPIMiddleware, async (req, res) => {
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
router.post('/combined-avs-data', duneAPIMiddleware, async (req, res) => {
    const { limit, offset, sortBy, nextUri } = req.query;
    try {
        const data = await GetCombinedAVSData(parseInt(limit) || 8, parseInt(offset) || 0, sortBy || 'num_operators desc', nextUri || '');
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to get operators for an AVS address
router.post('/operators', duneAPIMiddleware, async (req, res) => {
    const { avsAddress } = req.query;
    try {
        const data = await GetOperators(avsAddress);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to get operator stats
router.post('/operator-stats', duneAPIMiddleware, async (req, res) => {
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
router.post('/operator-metadata', duneAPIMiddleware, async (req, res) => {
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
router.post('/combined-operators-data', duneAPIMiddleware, async (req, res) => {
    const { avsAddress, batchStart, batchSize } = req.query;
    try {
        const data = await GetCombinedOperatorsData(avsAddress, parseInt(batchStart) || 0, parseInt(batchSize) || 10);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;



/**
 * @swagger
 * /dune/avs-stats:
 *   post:
 *     summary: Get AVS (Automated Valuation Services) statistics
 *     tags: [Dune]
 *     parameters:
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *         description: Number of results to return 
 *       - name: sortBy
 *         in: query
 *         schema:
 *           type: string
 *         description: Sort criteria 
 *       - name: nextUri
 *         in: query
 *         schema:
 *           type: string
 *         description: URI for fetching the next page of results
 *     responses:
 *       200:
 *         description: Successful response with AVS statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object  # Adjust schema as per your actual response structure
 */

/**
 * @swagger
 * /dune/avs-metadata:
 *   post:
 *     summary: Get metadata for AVS (Automated Valuation Services)
 *     tags: [Dune]
 *     parameters:
 *       - name: avsAddresses
 *         in: query
 *         schema:
 *           type: string
 *         description: Comma-separated list of AVS addresses
 *     responses:
 *       200:
 *         description: Successful response with AVS metadata
 *         content:
 *           application/json:
 *             schema:
 *               type: object  # Adjust schema as per your actual response structure
 */

/**
 * @swagger
 * /dune/combined-avs-data:
 *   post:
 *     summary: Get combined data for AVS (Automated Valuation Services)
 *     tags: [Dune]
 *     parameters:
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *         description: Number of results to return 
 *       - name: offset
 *         in: query
 *         schema:
 *           type: integer
 *         description: Offset for pagination 
 *       - name: sortBy
 *         in: query
 *         schema:
 *           type: string
 *         description: Sort criteria 
 *       - name: nextUri
 *         in: query
 *         schema:
 *           type: string
 *         description: URI for fetching the next page of results
 *     responses:
 *       200:
 *         description: Successful response with combined AVS data
 *         content:
 *           application/json:
 *             schema:
 *               type: object  # Adjust schema as per your actual response structure
 */

/**
 * @swagger
 * /dune/operators:
 *   post:
 *     summary: Get operators for an AVS (Automated Valuation Service) address
 *     tags: [Dune]
 *     parameters:
 *       - name: avsAddress
 *         in: query
 *         schema:
 *           type: string
 *         description: AVS address
 *     responses:
 *       200:
 *         description: Successful response with operators
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object  # Adjust schema as per your actual response structure
 */

/**
 * @swagger
 * /dune/operator-stats:
 *   post:
 *     summary: Get statistics for operators
 *     tags: [Dune]
 *     parameters:
 *       - name: operatorAddresses
 *         in: query
 *         schema:
 *           type: string
 *         description: Comma-separated list of operator addresses
 *     responses:
 *       200:
 *         description: Successful response with operator statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object  # Adjust schema as per your actual response structure
 */

/**
 * @swagger
 * /eigenexplorer/operator-metadata:
 *   post:
 *     summary: Get metadata for operators
 *     tags: [Dune]
 *     parameters:
 *       - name: operatorAddresses
 *         in: query
 *         schema:
 *           type: string
 *         description: Comma-separated list of operator addresses
 *     responses:
 *       200:
 *         description: Successful response with operator metadata
 *         content:
 *           application/json:
 *             schema:
 *               type: object  # Adjust schema as per your actual response structure
 */

/**
 * @swagger
 * /eigenexplorer/combined-operators-data:
 *   post:
 *     summary: Get combined data for operators related to an AVS address
 *     tags: [Dune]
 *     parameters:
 *       - name: avsAddress
 *         in: query
 *         schema:
 *           type: string
 *         description: AVS address
 *       - name: batchStart
 *         in: query
 *         schema:
 *           type: integer
 *         description: Starting batch index for fetching data 
 *       - name: batchSize
 *         in: query
 *         schema:
 *           type: integer
 *         description: Number of results per batch 
 *     responses:
 *       200:
 *         description: Successful response with combined operators data
 *         content:
 *           application/json:
 *             schema:
 *               type: object  # Adjust schema as per your actual response structure
 */
