import { useState } from "react";
import { FaRegEdit } from "react-icons/fa"
import Form from "../Form";
import { useQueryClient } from "@tanstack/react-query";

type Event = {
    id: string;
    title: string;
    description: string;
    date: string;
  };

type EditEventsProps = {
    event: Event;
};

export default function EditEvents ({event}: EditEventsProps) {
    const [showForm, setShowForm] = useState(false)
    const inputs = [
        {type: 'text', label: 'Título', placeholder: `${event.title}`, name:'title'},
        {type: 'date', label: 'Data', placeholder: `${event.date}`, name: 'date'},
        {type: 'text', label: 'Descrição', placeholder: `${event.description}`, name: 'description'}
    ]
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        description: '',
    })
    const queryClient = useQueryClient()

    const handleAddEvent = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:5000/edit-event/${event.id}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
      
            queryClient.invalidateQueries({ queryKey: ["events"] });
          } else {
            console.error("Failed to add event");
          }
        
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
        console.log(formData)
    }

    const toggleVisibility = () => {
        setShowForm(!showForm)
    }

    return(
        <div className="flex flex-col w-screen">
            <FaRegEdit className=" text-2xl" onClick={toggleVisibility} />
            {showForm && (
                <div className="w-3/4 self-center">
                    <Form inputs={inputs} onSubmit={handleAddEvent} onChange={handleInputChange} showCancelButton={true} onCancel={toggleVisibility}/>
                </div>
            )}
        </div>
    )
}