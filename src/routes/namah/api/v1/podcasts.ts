import { Router } from 'express';

//Models
import { PodcastModel } from '@models';

const router = Router();

router.get('/', async (req, res) => {
    try {
        req.query.limit = undefined;

        const result = await PodcastModel.find(req.query);

        if (result.length === 0) {
            res.status(404).json({
                wasSuccessful: false,
                description: 'No podcasts found',
            });

            return;
        }

        res.status(200).json({
            wasSuccessful: true,
            podcasts: result,
        });
    } catch (error) {
        res.status(500).json({
            wasSuccessful: false,
            description: 'Server error, please try again',
        });
    }
});

export default router;
