import { useState } from "react";
import Form from "../Form";

export default function ChangeUsernameForm () {
    const inputs = [
        {type: 'text', label: 'Username', placeholder: 'Digite seu novo username', name:'username'},
    ]
    const [formData, setFormData] = useState({username: ''})

    const handleUsernameChange = async (e: React.FormEvent) => {
      e.preventDefault();
      const response = await fetch("http://localhost:5000/edit-user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      console.log(await response)
  
      if (response.ok) {
        alert(`Username alterado para ${formData.username} com sucesso`);
      } else {
        alert('Erro ao alterar Username.');
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

  
    return (
        <Form inputs={inputs} onSubmit={handleUsernameChange} onChange={handleInputChange} />
    );
  };