import { Router } from 'express';
import { contact } from './contact.controller';

const router = Router();

router.post('/', contact);

export default router;
