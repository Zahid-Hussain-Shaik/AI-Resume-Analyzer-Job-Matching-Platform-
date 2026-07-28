import { Router } from 'express'; import { create, get, history, remove, report } from '../controllers/analysis.js';
const router = Router(); router.post('/', create); router.get('/history', history); router.get('/:id/report', report); router.get('/:id', get); router.delete('/:id', remove); export default router;
