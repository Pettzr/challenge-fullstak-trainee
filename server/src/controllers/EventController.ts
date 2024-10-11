import { Request, Response } from 'express';
import { addEventService, checkEventService, editEventService, getAllEventsService, removeEventService } from '../services/EventService';

    export async function addEventToAgendaController(req: Request, res: Response) {
        const userId  = req.user;
        const { title, description, date, time, repeat, frequency, recurrenceType } = req.body;
        console.log(date)
        const formatedDate = new Date(date)
        const formatedFrequency = Number(frequency)

        try {
            const updatedUser = await addEventService(userId as string, title, description, formatedDate, time, repeat, formatedFrequency, recurrenceType);
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
            res.status(200).json({events});
        } catch (error) {
            console.error("Erro ao buscar eventos:", error);
            res.status(400).json({ success: false, message: 'Error fetching events', error });
        }
    }

    export async function editEventController(req: Request, res: Response) {
        const userId = req.user;
        const { eventId } = req.params;
        let data = req.body;

        if (data.hasOwnProperty('date')) {
            data = {
                ...data,
                frequency: Number(data.frequency),
                date: new Date(data.date),
            };
        }

        try {
            const updatedUser = await editEventService(userId as string, eventId, data);
            res.status(200).json({ success: true, updatedUser });
        } catch (error) {
            console.error("Erro ao editar evento:", error);
            res.status(400).json({ success: false, message: 'Error editing event', error });
        }
    }
  
    export async function removeEventController(req: Request, res: Response) {
        const userId = req.user;
        const { eventId } = req.params;
    
        try {
            const updatedUser = await removeEventService(userId as string, eventId);
            res.status(200).json({ success: true, updatedUser });
        } catch (error) {
            res.status(400).json({ success: false, message: 'Error removing event from agenda', error });
        }
    }

    export async function checkEventsController (req: Request, res: Response) {
        const userId = req.user;

        try {
            const updatedUser = await checkEventService(userId as string);
            res.status(200).json({ success: true, updatedUser });
        } catch (error) {
            res.status(400).json({ success: false, message: 'Error checking event from agenda', error });
        }
    }