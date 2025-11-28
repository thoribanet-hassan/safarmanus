import { Router } from 'express';
import { createAlert, getAlerts, deleteAlert, updateAlert } from '../controllers/alertController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.use(authenticate);

router.post('/', createAlert);
router.get('/', getAlerts);
router.delete('/:id', deleteAlert);
router.put('/:id', updateAlert);

export default router;
