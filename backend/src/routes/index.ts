import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes';
import clientsRoutes from '../modules/clients/clients.routes';
import communicationsRoutes from '../modules/communications/communications.routes';
import contactRoutes from '../modules/contact/contact.routes';
import dashboardRoutes from '../modules/dashboard/dashboard.routes';
import pipelineRoutes from '../modules/pipeline/pipeline.routes';
import tasksRoutes from '../modules/tasks/tasks.routes';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Harmony CRM API' });
});

router.use('/auth', authRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/clients', clientsRoutes);
router.use('/pipeline', pipelineRoutes);
router.use('/tasks', tasksRoutes);
router.use('/communications', communicationsRoutes);
router.use('/contact', contactRoutes);

export default router;
