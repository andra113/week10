import { Router } from "express";
import { createUserController, getUsersController, loginUser } from "../controllers/userController";

const router = Router()

router.get('/users', getUsersController);

router.post('/users', createUserController)

router.post('/users/login', loginUser)
export default router;