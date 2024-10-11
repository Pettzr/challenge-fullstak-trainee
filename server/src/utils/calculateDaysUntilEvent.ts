import { stripTime } from "./stripTimeDate";

export function calculateDaysUntilEvent(eventDate: Date): string {
    const today = stripTime(new Date()); 
    const strippedEventDate = stripTime(eventDate);

    const timeDiff = strippedEventDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysDiff === 0) {
        return "Esse evento é hoje!";
    } else if (daysDiff > 0 && daysDiff <= 3) {
        return `Esse evento é daqui a ${daysDiff} dia(s).`;
    } else {
        return "";
    }
}
