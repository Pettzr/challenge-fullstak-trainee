import { NextApiRequest, NextApiResponse } from "next";


export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const {username, password, confirmPassword} = req.body;

        console.log(username, password, confirmPassword)
        try{ 
            const response = await fetch('http://localhost:5000/register',  {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  username,
                  password,
                  confirmPassword,
                }),
              });
        
              const data = await response.json();
              console.log(data)
              return res.status(200).json({ success: true, data });
            } catch (error) {
              return res.status(500).json({ success: false, message: 'Erro ao conectar com o servidor' });
            }
        } else {
            return res.status(405).json({ message: 'Método não permitido' });
        }
}