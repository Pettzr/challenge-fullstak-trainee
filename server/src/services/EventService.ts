import prisma from '../configs/prisma';
import { Event } from '../types/event';

export async function addEventService(userId: string, newEvent: Event) {

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { events: true },
    });
  
    if (!user) {
        throw new Error('Usuário não encontrado');
    }
  
    const currentEvents = Array.isArray(user.events) ? (user.events as any[]) : [];
  
    const updatedEvents = [...currentEvents, newEvent];
  
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        events: updatedEvents,
      },
    });
  
    return updatedUser;
}

export async function getAllEventsService(userdId: string) {
    const user = await prisma.user.findUnique({
        where: {id: userdId},
        select: {events : true},
    })

    if (!user) {
        throw new Error('Usuário não encontrado');
        
    }

    return user.events; 
}

export async function editEventService(userId: string, eventId: string, updatedEventData: Partial<Event>) {

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { events: true },
    });

    if (!user) {
        throw new Error('Usuário não encontrado');
    }

    const currentEvents = Array.isArray(user.events) ? (user.events as any[]) : [];
    const eventIndex = currentEvents.findIndex(event => event.id === eventId);

    if (eventIndex === -1) {
        throw new Error('Evento não encontrado');
    }

    const updatedEvent = { ...currentEvents[eventIndex], ...updatedEventData };

    currentEvents[eventIndex] = updatedEvent;

    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
            events: currentEvents,
        },
    });

    return updatedUser;
}
  
export async function removeEventService(userId: string, eventId: string) {
    const user = await prisma.user.findUnique({ 
            where: { id: userId },
            select: { events: true }
    });

    if (!user) throw new Error('User not found');

    const currentEvents = Array.isArray(user.events) ? (user.events as any[]) : [];

    const updatedEvents = currentEvents.filter((event: any) => event.id !== eventId);

    return await prisma.user.update({
        where: { id: userId },
        data: {
        events: updatedEvents,
        },
    });
}
  