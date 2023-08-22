import { Router } from "express";
import { getTransfersController, createTransfersController } from "../controllers/transferController";

const transferRouter = Router();

transferRouter.get('/transfers', getTransfersController);
transferRouter.post('/transfers', createTransfersController);

export default transferRouter