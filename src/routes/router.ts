import { Router } from "express";
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from "swagger-jsdoc";
import { createUserController, getUsersController, loginUser } from "../controllers/userController";

const router = Router()


router.get('/users', getUsersController);

router.post('/register', createUserController)

router.post('/login', loginUser)
export default router;