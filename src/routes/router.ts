import { Router } from "express";
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from "swagger-jsdoc";
import { createUserController, getUsersController, loginUser } from "../controllers/userController";
import * as fs from 'fs';
import * as yaml from 'js-yaml';

const yamlContent = fs.readFileSync('doc/apiDoc.yaml', 'utf8');
const swaggerDocument: any = yaml.load(yamlContent)

const router = Router()

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.get('/users', getUsersController);

router.post('/create', createUserController)

router.post('/login', loginUser)
export default router;