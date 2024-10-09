// EditEventPage.tsx
import { useEffect, useState } from 'react';

interface Event {
  id?: string;
  title: string;
  date: string;
  description: string;
}

interface EditEventPageProps {
  event: Event; // Pass the event to be edited
  onCancel: () => void; // Function to handle cancel
}

const EditEventPage: React.FC<EditEventPageProps> = ({ event, onCancel }) => {
  const [formData, setFormData] = useState<Event>(event);

  useEffect(() => {
    setFormData(event); // Set initial state when the event prop changes
  }, [event]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/edit-event/${formData.id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      onCancel(); // Hide the form after submission
      // Here you may want to notify the parent to update the event in the list
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-w-screen min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        {/* Form Fields Here */}
        <div className="mb-6">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            Event Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">
            Event Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
            Event Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
          >
            Edit Event
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-3 px-4 rounded-lg transition duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEventPage;
