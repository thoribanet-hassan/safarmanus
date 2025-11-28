import { Router } from 'express';
import { search, smartSearch } from '../controllers/flightController.js';

const router = Router();

router.post('/search', search);
router.post('/smart-search', smartSearch);

export default router;
