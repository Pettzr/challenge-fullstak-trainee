export function calculateNextDate(eventDate: Date, frequency: number, recurrenceType: string): Date {
    const now = new Date();
    let nextDate = new Date(eventDate); 

    while (nextDate <= now) {
        switch (recurrenceType) {
            case 'daily':
                nextDate.setDate(nextDate.getDate() + frequency);
                break;
            case 'weekly':
                nextDate.setDate(nextDate.getDate() + frequency * 7);
                break;
            case 'monthly':
                nextDate.setMonth(nextDate.getMonth() + frequency);
                break;
            default:
                throw new Error('Invalid recurrence type');
        }
    }

    return nextDate;
}
