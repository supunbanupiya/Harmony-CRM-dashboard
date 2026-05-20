import { Router } from 'express';
import { requireAuth } from '../../middleware/auth';
import { summary } from './dashboard.controller';

const router = Router();

router.get('/summary', requireAuth, summary);

export default router;
