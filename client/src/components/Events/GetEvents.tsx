"use client";
import { useQuery } from "@tanstack/react-query";
import DelEvents from "./DelEvents";
import AddEvents from "./AddEvents";
import EditEvents from "./EditEvents";

type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
};

type EventsResponse = {
  events: Event[];
};

export default function Events() {

    async function fetchEvents(): Promise<EventsResponse> {
        const response = await fetch('http://localhost:5000/get-events', {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      return response.json();
    }

  const { data, error, isLoading } = useQuery<EventsResponse>({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  if (isLoading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>Error loading events: {error.message}</div>;
  }

  return (
<div className="p-4 w-full">
  <h1 className="text-xl font-bold mb-4">Eventos</h1>
  <ul className="w-full space-y-4">
    {data?.events.map((event) => (
      <li key={event.id} className="flex flex-col justify-between items-start p-4 border rounded-md shadow-md bg-white">
        <div className="w-full flex justify-between">
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold">{event.title}</h1>
            <h2 className="text-gray-700">{event.description}</h2>
            <h2 className="text-gray-500">{event.date.split('T')[0].split('-').reverse().join('/')}</h2>
          </div>
        </div>
        
        <div className="flex justify-center w-full mt-4 space-x-4">
          <DelEvents eventId={event.id} />
          <EditEvents event={event} />
        </div>
      </li>
    ))}
    <li>
      <AddEvents />
    </li>
  </ul>
</div>

  );
}
