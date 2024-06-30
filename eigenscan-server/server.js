import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from "dotenv";
dotenv.config();

import "./config/email.js";
import { sendEmail } from './config/email.js';
import { asyncHandler } from './middleware/asyncErrorHandler.js';
import router from './api/dune.js'; 
import eigenrouter from './api/eigenexplorer.js';
import swaggerUi from 'swagger-ui-express';
import specs from './config/swaggerConfig.js'; 

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Mounting the Dune API router
app.use('/api/dune', router);

// Mounting the Eigen Explorer API router
app.use('/api/eigenexplorer', eigenrouter);

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
