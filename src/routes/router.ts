import { Router } from "express";
import { createUserController, getUsersController } from "../controllers/userController";

const router = Router()

router.get('/users', getUsersController);

router.post('/users', createUserController)
export default router;