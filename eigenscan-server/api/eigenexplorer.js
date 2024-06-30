/**
 * @swagger
 * tags:
 *   name: EigenExplorer
 *   description: API endpoints for EigenExplorer
 */

import express from 'express';
import fetch from 'node-fetch';

const eigenrouter = express.Router();

/**
 * @swagger
 * /eigenexplorer/version:
 *   get:
 *     summary: Get EigenExplorer API version
 *     tags: [EigenExplorer]
 *     responses:
 *       200:
 *         description: Successful response with API version
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 version:
 *                   type: string
 */
eigenrouter.get('/version', async (req, res) => {
    try {
        const response = await fetch('https://api.eigenexplorer.com/version');
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /eigenexplorer/health:
 *   get:
 *     summary: Check EigenExplorer health status
 *     tags: [EigenExplorer]
 *     responses:
 *       200:
 *         description: Successful response with health status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 */
eigenrouter.get('/health', async (req, res) => {
    try {
        const response = await fetch('https://api.eigenexplorer.com/health');
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /eigenexplorer/metrics:
 *   get:
 *     summary: Get EigenExplorer metrics
 *     tags: [EigenExplorer]
 *     responses:
 *       200:
 *         description: Successful response with metrics data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 metrics:
 *                   type: object  # Adjust schema as per your actual response structure
 */
eigenrouter.get('/metrics', async (req, res) => {
    try {
        const response = await fetch('https://api.eigenexplorer.com/metrics');
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /eigenexplorer/metrics/tvl:
 *   get:
 *     summary: Get Total Value Locked (TVL) metrics
 *     tags: [EigenExplorer]
 *     responses:
 *       200:
 *         description: Successful response with TVL metrics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tvl:
 *                   type: object  # Adjust schema as per your actual response structure
 */
eigenrouter.get('/metrics/tvl', async (req, res) => {
    try {
        const response = await fetch('https://api.eigenexplorer.com/metrics/tvl');
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /eigenexplorer/metrics/tvl/beacon-chain:
 *   get:
 *     summary: Get TVL metrics for Beacon Chain
 *     tags: [EigenExplorer]
 *     responses:
 *       200:
 *         description: Successful response with TVL metrics for Beacon Chain
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tvl:
 *                   type: object  # Adjust schema as per your actual response structure
 */
eigenrouter.get('/metrics/tvl/beacon-chain', async (req, res) => {
    try {
        const response = await fetch('https://api.eigenexplorer.com/metrics/tvl/beacon-chain');
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /eigenexplorer/metrics/tvl/restaking:
 *   get:
 *     summary: Get TVL metrics for Restaking
 *     tags: [EigenExplorer]
 *     responses:
 *       200:
 *         description: Successful response with TVL metrics for Restaking
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tvl:
 *                   type: object  # Adjust schema as per your actual response structure
 */
eigenrouter.get('/metrics/tvl/restaking', async (req, res) => {
    try {
        const response = await fetch('https://api.eigenexplorer.com/metrics/tvl/restaking');
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /eigenexplorer/metrics/tvl/restaking/{strategy}:
 *   get:
 *     summary: Get TVL metrics for a specific Restaking strategy
 *     tags: [EigenExplorer]
 *     parameters:
 *       - in: path
 *         name: strategy
 *         required: true
 *         schema:
 *           type: string
 *         description: Strategy name
 *     responses:
 *       200:
 *         description: Successful response with TVL metrics for the specified strategy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tvl:
 *                   type: object  # Adjust schema as per your actual response structure
 */
eigenrouter.get('/metrics/tvl/restaking/:strategy', async (req, res) => {
    const { strategy } = req.params;
    try {
        const response = await fetch(`https://api.eigenexplorer.com/metrics/tvl/restaking/${strategy}`);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /eigenexplorer/metrics/total-avs:
 *   get:
 *     summary: Get total AVS (Automated Valuation Services) metrics
 *     tags: [EigenExplorer]
 *     responses:
 *       200:
 *         description: Successful response with total AVS metrics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_avs:
 *                   type: number  # Adjust schema as per your actual response structure
 */
eigenrouter.get('/metrics/total-avs', async (req, res) => {
    try {
        const response = await fetch('https://api.eigenexplorer.com/metrics/total-avs');
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /eigenexplorer/metrics/total-operators:
 *   get:
 *     summary: Get total operators metrics
 *     tags: [EigenExplorer]
 *     responses:
 *       200:
 *         description: Successful response with total operators metrics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_operators:
 *                   type: number  # Adjust schema as per your actual response structure
 */
eigenrouter.get('/metrics/total-operators', async (req, res) => {
    try {
        const response = await fetch('https://api.eigenexplorer.com/metrics/total-operators');
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /eigenexplorer/metrics/total-stakers:
 *   get:
 *     summary: Get total stakers metrics
 *     tags: [EigenExplorer]
 *     responses:
 *       200:
 *         description: Successful response with total stakers metrics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_stakers:
 *                   type: number  # Adjust schema as per your actual response structure
 */
eigenrouter.get('/metrics/total-stakers', async (req, res) => {
    try {
        const response = await fetch('https://api.eigenexplorer.com/metrics/total-stakers');
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /eigenexplorer/avs:
 *   get:
 *     summary: Get all AVS (Automated Valuation Services)
 *     tags: [EigenExplorer]
 *     responses:
 *       200:
 *         description: Successful response with list of AVS
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object  # Adjust schema as per your actual response structure
 */
eigenrouter.get('/avs', async (req, res) => {
    try {
        const response = await fetch('https://api.eigenexplorer.com/avs');
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /eigenexplorer/avs/addresses:
 *   get:
 *     summary: Get addresses of all AVS (Automated Valuation Services)
 *     tags: [EigenExplorer]
 *     responses:
 *       200:
 *         description: Successful response with list of AVS addresses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
eigenrouter.get('/avs/addresses', async (req, res) => {
    try {
        const response = await fetch('https://api.eigenexplorer.com/avs/addresses');
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /eigenexplorer/avs/{address}:
 *   get:
 *     summary: Get details of an AVS (Automated Valuation Service) by address
 *     tags: [EigenExplorer]
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *         description: AVS address
 *     responses:
 *       200:
 *         description: Successful response with AVS details
 *         content:
 *           application/json:
 *             schema:
 *               type: object  # Adjust schema as per your actual response structure
 */
eigenrouter.get('/avs/:address', async (req, res) => {
    const { address } = req.params;
    try {
        const response = await fetch(`https://api.eigenexplorer.com/avs/${address}`);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /eigenexplorer/avs/{address}/stakers:
 *   get:
 *     summary: Get stakers of an AVS (Automated Valuation Service) by address
 *     tags: [EigenExplorer]
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *         description: AVS address
 *     responses:
 *       200:
 *         description: Successful response with stakers data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object  # Adjust schema as per your actual response structure
 */
eigenrouter.get('/avs/:address/stakers', async (req, res) => {
    const { address } = req.params;
    const url = `https://api.eigenexplorer.com/avs/${address}/stakers`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /eigenexplorer/avs/{address}/operators:
 *   get:
 *     summary: Get operators of an AVS (Automated Valuation Service) by address
 *     tags: [EigenExplorer]
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *         description: AVS address
 *     responses:
 *       200:
 *         description: Successful response with operators data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object  # Adjust schema as per your actual response structure
 */
eigenrouter.get('/avs/:address/operators', async (req, res) => {
    const { address } = req.params;
    const url = `https://api.eigenexplorer.com/avs/${address}/operators`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /eigenexplorer/operators:
 *   get:
 *     summary: Get all operators
 *     tags: [EigenExplorer]
 *     responses:
 *       200:
 *         description: Successful response with list of operators
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object  # Adjust schema as per your actual response structure
 */
eigenrouter.get('/operators', async (req, res) => {
    const url = 'https://api.eigenexplorer.com/operators';

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /eigenexplorer/operators/{address}:
 *   get:
 *     summary: Get details of an operator by address
 *     tags: [EigenExplorer]
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *         description: Operator address
 *     responses:
 *       200:
 *         description: Successful response with operator details
 *         content:
 *           application/json:
 *             schema:
 *               type: object  # Adjust schema as per your actual response structure
 */
eigenrouter.get('/operators/:address', async (req, res) => {
    const { address } = req.params;
    const url = `https://api.eigenexplorer.com/operators/${address}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /eigenexplorer/stakers:
 *   get:
 *     summary: Get all stakers
 *     tags: [EigenExplorer]
 *     responses:
 *       200:
 *         description: Successful response with list of stakers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object  # Adjust schema as per your actual response structure
 */
eigenrouter.get('/stakers', async (req, res) => {
    const url = 'https://api.eigenexplorer.com/stakers';

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /eigenexplorer/stakers/{address}:
 *   get:
 *     summary: Get details of a staker by address
 *     tags: [EigenExplorer]
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *         description: Staker address
 *     responses:
 *       200:
 *         description: Successful response with staker details
 *         content:
 *           application/json:
 *             schema:
 *               type: object  # Adjust schema as per your actual response structure
 */
eigenrouter.get('/stakers/:address', async (req, res) => {
    const { address } = req.params;
    const url = `https://api.eigenexplorer.com/stakers/${address}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /eigenexplorer/stakers/{address}/withdrawals:
 *   get:
 *     summary: Get withdrawals of a staker by address
 *     tags: [EigenExplorer]
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *         description: Staker address
 *     responses:
 *       200:
 *         description: Successful response with withdrawals data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object  # Adjust schema as per your actual response structure
 */
eigenrouter.get('/stakers/:address/withdrawals', async (req, res) => {
    const { address } = req.params;
    const url = `https://api.eigenexplorer.com/stakers/${address}/withdrawals`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /eigenexplorer/stakers/{address}/withdrawals/queued:
 *   get:
 *     summary: Get queued withdrawals of a staker by address
 *     tags: [EigenExplorer]
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *         description: Staker address
 *     responses:
 *       200:
 *         description: Successful response with queued withdrawals data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object  # Adjust schema as per your actual response structure
 */
eigenrouter.get('/stakers/:address/withdrawals/queued', async (req, res) => {
    const { address } = req.params;
    const url = `https://api.eigenexplorer.com/stakers/${address}/withdrawals/queued`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /eigenexplorer/stakers/{address}/withdrawals/queued_withdrawable:
 *   get:
 *     summary: Get queued withdrawable withdrawals of a staker by address
 *     tags: [EigenExplorer]
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *         description: Staker address
 *     responses:
 *       200:
 *         description: Successful response with queued withdrawable withdrawals data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object  # Adjust schema as per your actual response structure
 */
eigenrouter.get('/stakers/:address/withdrawals/queued_withdrawable', async (req, res) => {
    const { address } = req.params;
    const url = `https://api.eigenexplorer.com/stakers/${address}/withdrawals/queued_withdrawable`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /eigenexplorer/stakers/{address}/withdrawals/completed:
 *   get:
 *     summary: Get completed withdrawals of a staker by address
 *     tags: [EigenExplorer]
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *         description: Staker address
 *     responses:
 *       200:
 *         description: Successful response with completed withdrawals data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object  # Adjust schema as per your actual response structure
 */
eigenrouter.get('/stakers/:address/withdrawals/completed', async (req, res) => {
    const { address } = req.params;
    const url = `https://api.eigenexplorer.com/stakers/${address}/withdrawals/completed`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /eigenexplorer/withdrawals:
 *   get:
 *     summary: Get all withdrawals
 *     tags: [EigenExplorer]
 *     responses:
 *       200:
 *         description: Successful response with list of withdrawals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object  # Adjust schema as per your actual response structure
 */
eigenrouter.get('/withdrawals', async (req, res) => {
    const url = 'https://api.eigenexplorer.com/withdrawals';

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /eigenexplorer/withdrawals/{withdrawalRoot}:
 *   get:
 *     summary: Get withdrawals by withdrawal root
 *     tags: [EigenExplorer]
 *     parameters:
 *       - in: path
 *         name: withdrawalRoot
 *         required: true
 *         schema:
 *           type: string
 *         description: Withdrawal root
 *     responses:
 *       200:
 *         description: Successful response with withdrawals data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object  # Adjust schema as per your actual response structure
 */
eigenrouter.get('/withdrawals/:withdrawalRoot', async (req, res) => {
    const { withdrawalRoot } = req.params;
    const url = `https://api.eigenexplorer.com/withdrawals/${withdrawalRoot}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default eigenrouter;

