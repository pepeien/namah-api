import { Router } from 'express';

// Types
import { default as Endpoints } from './enpoints';

const router = Router();

router.get('/', async (req, res) => {
    try {
        res.status(200).json({
            wasSuccessful: true,
            result: Endpoints,
        });
    } catch (error) {
        res.status(error.code ?? 500).json({
            wasSuccessful: false,
            descirption: error.message,
        });
    }
});

export default router;
