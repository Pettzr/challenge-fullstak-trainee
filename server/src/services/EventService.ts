import prisma from '../configs/prisma';
import { calculateDaysUntilEvent } from '../utils/calculateDaysUntilEvent';
import { calculateNextDate } from '../utils/calculateNextEventDate';
import { stripTime } from '../utils/stripTimeDate';

export async function addEventService(
    userId: string, 
    title: string, 
    description: string, 
    date: Date,
    time?: string,
    repeat?: boolean,
    frequency?: number,
    recurrenceType?: string, 
) {

    const eventData: any = {
        title: title,
        description: description,
        date: date,
        userId: userId
    };

    if (typeof time !== 'undefined') eventData.time = time;
    if (typeof repeat !== 'undefined') eventData.repeat = repeat;
    if (typeof frequency !== null) eventData.frequency = frequency;
    if (typeof recurrenceType !== 'undefined') eventData.recurrenceType = recurrenceType;

    const event = await prisma.event.create({
      data: eventData
    });
  
    return event;
}

export async function getAllEventsService(userdId: string) {

    const events = await prisma.event.findMany({
        where: {
            userId: userdId
        }
      });
    
      return events
}

export async function editEventService(userId: string, eventId: string, data: object) {

    const updatedEvent = await prisma.event.update({
        where: {
            id: eventId,
            userId: userId
        },
        data: {
            ...data
        }
      });

    return updatedEvent  
}
  
export async function removeEventService(userId: string, eventId: string) {

    const deleteEvent = await prisma.event.delete({
        where : {
            id: eventId,
            userId: userId
        }
    })

    return deleteEvent

}

export async function checkEventService (userId: string) {
    const currentDate = stripTime(new Date())

    let events = await prisma.event.findMany({
        where: {userId: userId}
    })

    const eventPromises = events.map( async (event) => {

        const eventDate = stripTime(event.date)

        if(eventDate.getTime() < currentDate.getTime()) {
            if(!event.repeat) {
                return prisma.event.delete({
                    where: {id: event.id}
                })
            } else {
                const nextDate = calculateNextDate(event.date, event.frequency!, event.recurrenceType!)

                await prisma.event.create({
                    data: {
                        title: event.title,
                        description: event.description,
                        date: nextDate,
                        repeat: event.repeat,
                        frequency: event.frequency,
                        recurrenceType: event.recurrenceType,
                        userId: event.userId
                    }
                })

                return prisma.event.delete({
                    where: {
                      id: event.id
                    }
                });
            }
        }
    })

    await Promise.all(eventPromises);

    const updatedEvents = await prisma.event.findMany({
        where: { userId: userId }
    });

    const eventsWithDaysInfo = updatedEvents.map(event => {
        const daysMessage = calculateDaysUntilEvent(event.date);
        return {
            ...event,
            daysUntilEvent: daysMessage
        };
    });

    return eventsWithDaysInfo;
}
  