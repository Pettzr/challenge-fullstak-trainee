import { Router } from 'express';
import { addEventToAgendaController, editEventController, removeEventFromAgendaController, getAllEventsController } from '../controllers/EventController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.get('/get-events', authenticateToken, getAllEventsController)
router.post('/add-event', authenticateToken, addEventToAgendaController);
router.patch('/edit-event/:eventId', authenticateToken, editEventController)
router.delete('/del-event/:eventId', authenticateToken, removeEventFromAgendaController);

export default router;