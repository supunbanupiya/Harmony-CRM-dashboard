import { Router } from 'express';
import { requireAuth } from '../../middleware/auth';
import { getCommunications, postCommunication } from './communications.controller';

const router = Router();

router.get('/', requireAuth, getCommunications);
router.post('/', requireAuth, postCommunication);

export default router;
