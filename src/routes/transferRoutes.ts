import { Router } from "express";
import { getTransfersController, createTransfersController } from "../controllers/transferController";
import authentication from "../middleware/jwtAuth";

const transferRouter = Router();

transferRouter.get('/transfers', authentication, getTransfersController);

transferRouter.post('/transfers', createTransfersController);

export default transferRouter