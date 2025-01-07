import express, { Request, Response } from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/convert', async (req: Request, res: Response) => {
    const { amount, from, to } = req.query;

    if (!amount || !from || !to) {
        return res.status(400).send('We are missing a required parameter');
    }

    try {
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${from}`);
        const rate = response.data.rates[to];
        const convertedAmount = rate * Number(amount);
        res.json({ convertedAmount });
    } catch (error) {
        res.status(500).send('Error fetching exchange rates');
    }
});

export { router };