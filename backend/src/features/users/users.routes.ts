import { Router } from 'express';
import { UsersController } from './users.controller';

const router = Router();
const usersController = new UsersController();

router.get('/profile', usersController.getProfile);

export default router;
