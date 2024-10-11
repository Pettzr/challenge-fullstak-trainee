import { useQueryClient } from "@tanstack/react-query";
import { TbTrash } from "react-icons/tb";

type DelEventProps = {
    eventId: string;
}

export default function DelEvents ({eventId}: DelEventProps) {
    const queryClient = useQueryClient()

    const handleDelEvent = async (eventId: string) => {
        const response = await fetch(`http://localhost:5000/del-event/${eventId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
      
            queryClient.invalidateQueries({ queryKey: ["events"] });
          } else {
            console.error("Failed to add event");
          }
    }

    return(
        <div className="">
            <TbTrash onClick={() => handleDelEvent(eventId)} className="text-2xl"/>
        </div>
    )
}