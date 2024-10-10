import { useState } from "react";
import { GoPlusCircle } from "react-icons/go";
import Form from "../Form";
import { useQueryClient } from "@tanstack/react-query";

export default function AddEvents () {
    const [showForm, setShowForm] = useState(false)
    const inputs = [
        {type: 'text', label: 'Título', placeholder: 'Digite o título', name:'title'},
        {type: 'date', label: 'Data', placeholder: 'dd/mm/yyyy', name: 'date'},
        {type: 'text', label: 'Descrição', placeholder: 'Digite a descrição', name: 'description'}
    ]
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        description: '',
    })
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
        <div>
            {!showForm && <GoPlusCircle className="text-4xl" onClick={toggleVisibility} />}
            {
                showForm && (
                    <Form inputs={inputs} onSubmit={handleAddEvent} onChange={handleInputChange} showCancelButton={true} onCancel={toggleVisibility}/>
                )
            }
        </div>
    )
}