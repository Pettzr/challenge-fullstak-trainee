"use client";
import Form from "@/components/Form";
import { useState } from "react";


export default function Page () {
    const inputs = [
        {type: 'text', label: 'Username', placeholder: 'Digite seu username', name:'username'},
        {type: 'password', label: 'Senha',  placeholder: 'Digite sua senha', name: 'password'},
    ]

    const [formData, setFormData] = useState({username: '', password: '', confirmPassword: ''})

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await fetch('/api/user/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });
      
            const data = await response.json();
            if (data.success) {
              console.log('Login realizado com sucesso!');
            } else {
              console.log('Erro no login. Tente novamente.');
            }
          } catch (error) {
            console.log('Erro ao enviar o formulário.');
          }
    }

    return(
        <div>
            <Form inputs={inputs} onSubmit={handleSubmit} onChange={handleInputChange}/>
        </div>
    )
}