import { Router } from 'express';
import { requireAuth } from '../../middleware/auth';
import { getTasks, patchTaskStatus, postTask } from './tasks.controller';

const router = Router();

router.get('/', requireAuth, getTasks);
router.post('/', requireAuth, postTask);
router.patch('/:id/status', requireAuth, patchTaskStatus);

export default router;
