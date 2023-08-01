import { Router } from 'express';

// Routes
import specs from './specs';
import v1 from './v1';

const router = Router();

router.use('/specs', specs);
router.use('/v1', v1);

export default router;
