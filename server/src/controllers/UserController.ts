import { Request, Response } from 'express';
import { registerUserService, loginUserService } from '../services/UserService';

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
      sameSite: 'none', // Ensure this is set if you're testing cross-origin
      secure: false,    // Set to false for HTTP in development
      path: '/',        // Make sure it applies to all paths
    });

    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error logging in', error });
  }
}