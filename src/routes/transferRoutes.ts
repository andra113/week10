import { Router } from "express";
import { getTransfersController, createTransfersController, getTransferByIdController } from "../controllers/transferController";
import authentication from "../middleware/jwtAuth";

const transferRouter = Router();

transferRouter.get('/transfers', authentication, getTransfersController);

transferRouter.get('/transfers/:id', authentication, getTransferByIdController);

transferRouter.post('/transfers', createTransfersController);

export default transferRouter