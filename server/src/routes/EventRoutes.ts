import { Router } from 'express';
import { addEventToAgendaController, editEventController, removeEventController, getAllEventsController, checkEventsController } from '../controllers/EventController';
import { authenticateToken } from '../middlewares/authMiddleware';
import { eventValidationRules, validateEvent } from '../middlewares/eventDataValidationMiddleware';

const router = Router();

router.get('/get-events', authenticateToken, getAllEventsController)
router.get('/check-events', authenticateToken, checkEventsController )
router.post('/add-event', eventValidationRules, validateEvent, authenticateToken, addEventToAgendaController);
router.patch('/edit-event/:eventId', eventValidationRules, validateEvent, authenticateToken, editEventController)
router.delete('/del-event/:eventId', authenticateToken, removeEventController);

export default router;