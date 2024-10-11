import { Request, Response } from 'express';
import { registerUserService, loginUserService, deleteUserService, editUserService, checkLoginService} from '../services/UserService';

export async function registerUserController(req: Request, res: Response): Promise<void> {
    const { username, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        res.status(400).json({ message: 'Passwords do not match' });
        return
    }

    try {
        const user = await registerUserService(username, password);
        res.status(201).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating user', error });
    }
}

export async function loginUserController(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
        const { token } = await loginUserService(username, password);

        res.cookie('token', token, {
          httpOnly: true,
          sameSite: 'lax',
          secure: false,    
          maxAge: 60 * 60 * 10000     
        });

        res.status(200).json({ success: true, token });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error logging in', error });
    }
}


export async function logoutUserController (req: Request, res: Response) {
    try{
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'lax',
            secure: false, 
            path: '/',     
        });
    
        res.status(200).json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error logging out', error });
    }
}

export async function checkLoginController (req: Request, res: Response) {
    const userId  = req.user;
    try {
        const user = await checkLoginService(userId as string);
        res.status(200).json(user);
    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        res.status(400).json({ success: false, message: 'Error deleting user', error });
    }
}

export async function editUserController (req: Request, res: Response) {
    const userId  = req.user;
    const {username} = req.body;

    try {
        const user = await editUserService(userId as string, username);
        res.status(200).json({user});
    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        res.status(400).json({ success: false, message: 'Error deleting user', error });
    }
}

export async function deleteUserController (req: Request, res: Response) {
    const userId  = req.user;

    try {
        const deleteUser = await deleteUserService(userId as string);
        res.status(200).json({deleteUser});
    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        res.status(400).json({ success: false, message: 'Error deleting user', error });
    }
}