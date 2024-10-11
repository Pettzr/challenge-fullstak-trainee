import { useState } from "react";
import { MdOutlineEditCalendar } from "react-icons/md";
import Form from "../Form";
import { useQueryClient } from "@tanstack/react-query";

type Event = {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
  };

type EditEventsProps = {
    event: Event;
};

export default function EditEvents ({event}: EditEventsProps) {
    const [showForm, setShowForm] = useState(false)

    const baseInputs = [
        {type: 'text', label: 'Título', placeholder: `${event.title}`, name:'title'},
        {type: 'date', label: 'Data', placeholder: `${event.date.split('T')[0].split('-').reverse().join('/')}`, name: 'date'},
        {type: 'text', label: 'Horário', placeholder: '00:00hs', name: 'time'},
        {type: 'text', label: 'Descrição', placeholder: `${event.description}`, name: 'description'},
        {type: 'checkbox', label: 'Repetir', placeholder: '', name:'repeat'},
    ]
    const repeatInputs = [
        {type: 'number', label: 'Frequência', placeholder: 'Digite a frequência de repetição', name:'frequency'},
        {type: 'select', label: 'Tipo', placeholder:'', name: 'recurrenceType'}
    ]

    const resetForm = {
        title: event.title,
        date: event.date,
        time: event.time,
        description: event.description,
        repeat: false,
        frequency: 0,
        recurrenceType: 'daily'
    }

    const [formData, setFormData] = useState(resetForm)
    const queryClient = useQueryClient()

    const handleEditEvent = async (e: React.FormEvent<HTMLFormElement>) => {
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
            setShowForm(false);
          } else {
            console.error("Failed to Edit event");
          }
        
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value, type} = e.target
        const isCheckbox = type === 'checkbox';
        const checked = isCheckbox ? (e.target as HTMLInputElement).checked : undefined;

        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }

    const toggleVisibility = () => {
        setShowForm(!showForm)
        setFormData(resetForm)
    }

    return(
        <div className="flex flex-col gap-2 w-full">
            <MdOutlineEditCalendar className=" text-2xl" onClick={toggleVisibility} />
            {showForm && (
                <div className="">
                    <Form inputs={formData.repeat ? [...baseInputs, ...repeatInputs] : baseInputs} onSubmit={handleEditEvent} onChange={handleInputChange} showCancelButton={true} onCancel={toggleVisibility}/>
                </div>
            )}
        </div>
    )
}