import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const userValidationRules = [
    body('username')
        .trim()
        .isString().withMessage('Username must be a string')
        .notEmpty().withMessage('Username is required'),
        
    body('password')
        .optional()
        .trim()
        .isString().withMessage('Password must be a string')
        .notEmpty().withMessage('Password is required')
];

export const validateUser = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ success: false, errors: errors.array() });
    } else {
        next();
    }
};
