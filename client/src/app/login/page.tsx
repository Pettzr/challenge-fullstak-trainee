"use client";
import Form from "@/components/Form";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Page () {
    const inputs = [
        {type: 'text', label: 'Username', placeholder: 'Digite seu username', name:'username'},
        {type: 'password', label: 'Senha',  placeholder: 'Digite sua senha', name: 'password'},
    ]
    const router = useRouter()

    const [formData, setFormData] = useState({username: '', password: ''})

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    async function checkEvents() {
      const response = await fetch('http://localhost:5000/check-events', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      const data = await response.json();
    
      const upcomingEvents = data.updatedUser.filter((event: any) => event.daysUntilEvent !== "");
    
      if (upcomingEvents.length > 0) {
        const alertMessage = upcomingEvents
          .map((event: any) => `${event.title}: ${event.daysUntilEvent}`)
          .join('\n');
    
        alert(alertMessage);
      }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:5000/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
              credentials: 'include'
            });
      
            const data = await response.json();
            if (data.success) {
              checkEvents()
              router.push('/')
            } else {
              alert('Erro no login. Tente novamente.');
            }
          } catch (error) {
            alert('Erro ao enviar o formulário.');
          }
    }

    return(
        <div className="min-w-screen min-h-screen flex justify-center items-center">
          <div className="w-11/12 sm:w-4/5 xl:w-3/4">
            <Form inputs={inputs} onSubmit={handleSubmit} onChange={handleInputChange}/>
          </div>
        </div>
    )
}