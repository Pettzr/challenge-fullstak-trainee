import { Request, Response } from "express";
import { deleteUserAdminService, editUserAdminService, getUsersAdminService } from "../services/AdminService";


export async function getUsersAdminController(req: Request, res: Response) {
    const userId = req.user
    
    try {
        const users = await getUsersAdminService(userId as string);
        res.status(200).json({ success: true, users });
    } catch (error: any) {
        console.error("Erro ao buscar usuários:", error);
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function editUserAdminController (req: Request, res: Response) {
    const userId  = req.user;
    const {username, newUsername} = req.body;

    try {
        const user = await editUserAdminService(userId as string, username, newUsername);
        res.status(200).json({user});
    } catch (error: any) {
        console.error("Erro ao editar usuários:", error);
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function deleteUserAdminController (req: Request, res: Response) {
    const userId  = req.user;
    const {username} = req.body;

    try {
        const user = await deleteUserAdminService(userId as string, username);
        res.status(200).json({user});
    } catch (error: any) {
        console.error("Erro ao deletar usuários:", error);
        res.status(400).json({ success: false, message: error.message });
    }
}