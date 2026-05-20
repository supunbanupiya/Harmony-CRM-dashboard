import { Router } from 'express';
import { requireAuth } from '../../middleware/auth';
import { getClients, postClient } from './clients.controller';

const router = Router();

router.get('/', requireAuth, getClients);
router.post('/', requireAuth, postClient);

export default router;
