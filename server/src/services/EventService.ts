import prisma from '../configs/prisma';

export async function addEventService(userId: string, title: string, description: string, date: Date) {

    

    const event = await prisma.event.create({
      data: {
        title: title,
        description: description,
        date: date,
        userId: userId
      },
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
  