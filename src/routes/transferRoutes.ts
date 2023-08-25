import { Router } from "express";
import { getTransfersController, createTransfersController, getTransferByIdController, updateTransferStatus } from "../controllers/transferController";
import authentication from "../middleware/jwtAuth";

const transferRouter = Router();

transferRouter.get('/transfers', authentication, getTransfersController);

transferRouter.get('/transfers/:id', authentication, getTransferByIdController);

transferRouter.post('/transfers', createTransfersController);

transferRouter.patch('/transfers/:id', authentication, updateTransferStatus);

export default transferRouter