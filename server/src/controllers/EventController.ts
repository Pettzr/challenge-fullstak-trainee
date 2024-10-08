import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { addEventService, editEventService, getAllEventsService, removeEventService } from '../services/EventService';

    export async function addEventToAgendaController(req: Request, res: Response) {
        const userId  = req.user;
        const { event } = req.body;
    
        try {

            const newEvent = {
                ...event,
                id: uuidv4(),
            }

            const updatedUser = await addEventService(userId as string, newEvent);
            res.status(200).json({ success: true, updatedUser });
        } catch (error) {
            console.error("Erro ao adicionar evento:", error);
            res.status(400).json({ success: false, message: 'Error adding event to agenda', error });
        }
    }

    export async function getAllEventsController (req: Request, res: Response) {
        const userId = req.user;

    try {
        const events = await getAllEventsService(userId as string);
        res.status(200).json({ success: true, events });
    } catch (error) {
        console.error("Erro ao buscar eventos:", error);
        res.status(400).json({ success: false, message: 'Error fetching events', error });
    }
    }

    export async function editEventController(req: Request, res: Response) {
        const userId = req.user;
        const { eventId } = req.params;
        const updatedEventData = req.body;

        try {
            const updatedUser = await editEventService(userId as string, eventId, updatedEventData);
            res.status(200).json({ success: true, updatedUser });
        } catch (error) {
            console.error("Erro ao editar evento:", error);
            res.status(400).json({ success: false, message: 'Error editing event', error });
        }
    }
  
    export async function removeEventFromAgendaController(req: Request, res: Response) {
        const userId = req.user;
        const { eventId } = req.params;
    
        try {
            const updatedUser = await removeEventService(userId as string, eventId);
            res.status(200).json({ success: true, updatedUser });
        } catch (error) {
            res.status(400).json({ success: false, message: 'Error removing event from agenda', error });
        }
    }