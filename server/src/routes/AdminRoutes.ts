import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import { deleteUserAdminController, editUserAdminController, getUsersAdminController } from '../controllers/AdminController';
import { userValidationRules, validateUser } from '../middlewares/userDataValidationMiddleware';

const router = Router();

router.get('/admin-get', authenticateToken, getUsersAdminController)
router.patch('/admin-patch', userValidationRules, validateUser, authenticateToken, editUserAdminController)
router.delete('/admin-delete', authenticateToken, deleteUserAdminController)

export default router;