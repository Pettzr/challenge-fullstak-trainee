import { Router } from 'express';
import { registerUserController, loginUserController, logoutUserController, deleteUserController, editUserController, checkLoginController } from '../controllers/UserController';
import { authenticateToken } from '../middlewares/authMiddleware';
import { userValidationRules, validateUser } from '../middlewares/userDataValidationMiddleware';

const router = Router();

router.post('/register', userValidationRules, validateUser, registerUserController);
router.post('/login', userValidationRules, validateUser, loginUserController);
router.get('/logout', logoutUserController )
router.get('/check-login', authenticateToken, checkLoginController )
router.patch('/edit-user', userValidationRules, validateUser, authenticateToken, editUserController)
router.delete('/delete-user', authenticateToken, deleteUserController)


export default router;