import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const eventValidationRules = [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('date').isISO8601().withMessage('Invalid date format'),
    body('repeat').isBoolean().withMessage('Repeat must be a boolean'),
    body('time').optional().notEmpty().withMessage('Time can not be empty'),

    body('frequency')
    .if(body('repeat').equals('true'))
    .notEmpty().withMessage('Frequency is required when repeat is true')
    .isInt({ min: 1 }).withMessage('Frequency must be a positive integer'),
  
    body('recurrenceType')
    .if(body('repeat').equals('true'))
    .notEmpty().withMessage('Recurrence type is required when repeat is true')
    .isIn(['daily', 'weekly', 'monthly'])
    .withMessage('Recurrence type must be one of: daily, weekly, monthly')
];


export const validateEvent = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, errors: errors.array() });
    } else {
      next();
    }
};
