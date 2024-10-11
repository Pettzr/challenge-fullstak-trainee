"use client";
import { useQuery } from "@tanstack/react-query";
import DelEvents from "./DelEvents";
import AddEvents from "./AddEvents";
import EditEvents from "./EditEvents";
import LoadingMessage from "../Messages/LoadingMessage";
import LoginPrompt from "../Messages/LoginPrompt";
import ErrorMessage from "../Messages/ErrorMessage";

type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
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
        const data = await response.json()
        throw new Error(data.message);
      }
      return response.json();
    }

  const { data, error, isLoading } = useQuery<EventsResponse>({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  if (isLoading) {
    return <LoadingMessage />;
  }

  if (error) {
    if (error.message === 'Access denied. No token provided.') {
      return <LoginPrompt />;
    }
    return <ErrorMessage message={`Error loading events: ${error.message}`} />;
  }

  if (data) {
    fetch('http://localhost:5000/check-events', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return (
    <div className="w-full min-h-full p-3 md:p-12">
      <h1 className="text-xl font-bold mb-4">Eventos</h1>
      <ul className="w-full space-y-4">
        {data?.events.map((event) => (
          <li key={event.id} className="flex flex-col justify-between items-start p-4 border rounded-md shadow-md bg-white">
            <div className="w-full flex justify-between">
              <div className="flex flex-col">
                <h1 className="text-lg font-semibold">{event.title}</h1>
                <h2 className="text-gray-700">{event.description}</h2>
                <div className="flex">
                  <h2 className="text-gray-500 ">{event.date.split('T')[0].split('-').reverse().join('/')}</h2>
                  <h2 className="text-gray-500 ml-4">{event.time}</h2>
                </div>
              </div>
            </div>

          <div className="flex flex-col gap-2 w-full ">
            <div className="">
              <DelEvents eventId={event.id} />
            </div>
            
            <div className="">
              <EditEvents event={event} />
            </div>
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
