"use client";
import Form from "@/components/Form";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page () {
    const inputs = [
        {type: 'text', label: 'Username', placeholder: 'Digite seu username', name:'username'},
        {type: 'password', label: 'Senha',  placeholder: 'Digite sua senha', name: 'password'},
        {type: 'password', label: 'Confirmar a senha',  placeholder: 'Digite novamente sua senha', name: 'confirmPassword'}
    ]
    const [formData, setFormData] = useState({username: '', password: '', confirmPassword: ''})
    const router = useRouter()


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement >) => {
        e.preventDefault()
        try{ 
            const response = await fetch('http://localhost:5000/register',  {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
              credentials: 'include',
            });
      
            const data = await response.json();
            if (data.success) {
              router.push('/login')
            } else {
              alert('Erro no registro. Tente novamente.');
            }
        } catch (error) {
          alert('Erro no registro. Tente novamente.');
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