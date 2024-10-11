import { useState } from "react";
import { GoPlusCircle } from "react-icons/go";
import Form from "../Form";
import { useQueryClient } from "@tanstack/react-query";

export default function AddEvents () {
    const [showForm, setShowForm] = useState(false)
    const baseInputs = [
        {type: 'text', label: 'Título', placeholder: 'Digite o título', name:'title'},
        {type: 'date', label: 'Data', placeholder: 'dd/mm/yyyy', name: 'date'},
        {type: 'text', label: 'Descrição', placeholder: 'Digite a descrição', name: 'description'},
        {type: 'checkbox', label: 'Repetir', placeholder: '', name:'repeat'},
    ]
    const repeatInputs = [
        {type: 'number', label: 'Frequência', placeholder: 'Digite a frequência de repetição', name:'frequency'},
        {type: 'select', label: 'Tipo', placeholder:'', name: 'recurrenceType'}
    ]

    const resetForm = {
        title: '',
        date: '',
        description: '',
        repeat: false,
        frequency: 0,
        recurrenceType: ''
    }

    const [formData, setFormData] = useState(resetForm)
    const queryClient = useQueryClient()

    const handleAddEvent = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const response = await fetch('http://localhost:5000/add-event', {
            method: 'POST',
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
            console.error("Failed to add event");
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
        <div>
            {!showForm && <GoPlusCircle className="text-4xl" onClick={toggleVisibility} />}
            {
                showForm && (
                    <Form inputs={formData.repeat ? [...baseInputs, ...repeatInputs] : baseInputs} onSubmit={handleAddEvent} onChange={handleInputChange} showCancelButton={true} onCancel={toggleVisibility}/>
                )
            }
        </div>
    )
}