// Events.tsx
"use client";
import { useEffect, useState } from 'react';
import { TbTrash } from "react-icons/tb";
import { FaRegEdit } from "react-icons/fa";
import AddEventPage from '@/components/AddEvent'; // Ensure the correct import path
import EditEventPage from '@/components/EditEvent';

interface Event {
  id?: string;
  title: string;
  date: string;
  description: string;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState(null);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [showAddEventPage, setShowAddEventPage] = useState(false);
  const [showEditEventPage, setShowEditEventPage] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/get-events', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEvents(data.events);
      } catch (err) {
        setError(err as any);
      }
    };

    fetchEvents();
  }, []);

  const handleDeleteEvent = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/del-event/${id}`, {
        method: 'PATCH', // Use DELETE for removing an event
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setEvents(events.filter(event => event.id !== id));
    } catch (err) {
      setError(err as any);
    }
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setShowEditEventPage(true);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Events</h1>
      {error && <p className="text-red-500">Error: {error}</p>}
      <ul className="space-y-4">
        {events.map((event) => (
          <li key={event.id} className="flex items-center justify-between p-4 border rounded-md shadow-md">
            <div className="flex-grow">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">{event.title}</span>
                <span className="text-sm text-gray-500">Date: {event.date}</span>
              </div>
              <p className="text-sm text-gray-600">{event.description}</p>
              <div className="flex space-x-4">
                <FaRegEdit className='text-3xl cursor-pointer' onClick={() => handleEditEvent(event)} />
                <TbTrash className='text-3xl cursor-pointer' onClick={() => handleDeleteEvent(event.id!)} />
              </div>
            </div>
          </li>
        ))}
      </ul>
      {showAddEventPage && (
        <AddEventPage
          onCancel={() => {
            setShowAddEventPage(false); // Hide form on cancel
            // Optionally, you could notify to refresh the events list here
          }}
        />
      )}
      {showEditEventPage && editingEvent && (
        <EditEventPage
          event={editingEvent}
          onCancel={() => {
            setShowEditEventPage(false); // Hide form on cancel
            setEditingEvent(null); // Reset editing event state
          }}
        />
      )}
      <button
        onClick={() => setShowAddEventPage(true)} // Show the add event form
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
      >
        Add Event
      </button>
    </div>
  );
}
