import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";


export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const {username, password} = req.body;

        try{ 
            const response = await fetch('http://localhost:5000/login',  {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  username,
                  password,
                }),
                credentials: 'include',
              });

              if (response.ok) {
                const data = await response.json();
                const token = data.token;

                res.setHeader('Set-Cookie', `token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=36000`);

                res.status(200).json({ success: true });

              } else {
                const errorData = await response.json();
                res.status(400).json({ success: false, message: errorData.message });
              }
            } catch (error) {
              return res.status(500).json({ success: false, message: 'Erro ao conectar com o servidor' });
            }
        } else {
            return res.status(405).json({ message: 'Método não permitido' });
        }
}