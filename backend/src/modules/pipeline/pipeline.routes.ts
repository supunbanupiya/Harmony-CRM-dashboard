import { Router } from 'express';
import { requireAuth } from '../../middleware/auth';
import { pipeline } from './pipeline.controller';

const router = Router();

router.get('/', requireAuth, pipeline);

export default router;
