import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
    const token = req.cookies.token;

    if (!token) {
        res.status(401).json({ message: 'Access denied. No token provided.' });
        return;
    }

    try {
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secrettoken') as string | JwtPayload;
      const {userId} = decoded as {userId: string}
      req.user = userId; 
      next();

    } catch (error) {
      res.status(400).json({ message: 'Invalid token.' });
      return;
    }
}
