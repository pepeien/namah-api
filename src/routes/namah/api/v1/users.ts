import { Router } from 'express';

//Models
import { UserModel } from '@models';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const result = await UserModel.find(req.query);

        if (result.length === 0) {
            res.status(404).json({
                wasSuccessful: false,
                description: 'No users found',
            });

            return;
        }

        res.status(200).json({
            wasSuccessful: true,
            users: result,
        });
    } catch (error) {
        res.status(500).json({
            wasSuccessful: false,
            description: 'Server error, please try again',
        });
    }
});

export default router;
