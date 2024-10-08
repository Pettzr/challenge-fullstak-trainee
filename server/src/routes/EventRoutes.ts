import { Router } from 'express';
import { addEventToAgendaController, editEventController, removeEventFromAgendaController, getAllEventsController } from '../controllers/EventController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.patch('/add-event', authenticateToken, addEventToAgendaController);
router.patch('/edit-event/:eventId', authenticateToken, editEventController)
router.patch('/del-event/:eventId', authenticateToken, removeEventFromAgendaController);
router.get('/get-events', authenticateToken, getAllEventsController)

export default router;