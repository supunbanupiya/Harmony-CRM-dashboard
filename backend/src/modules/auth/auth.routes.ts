import { Router } from 'express';
import { requireAuth } from '../../middleware/auth';
import { login, me, signup } from './auth.controller';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', requireAuth, me);

export default router;
