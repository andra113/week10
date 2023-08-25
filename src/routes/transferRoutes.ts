import { Router } from "express";
import { getTransfersController, createTransfersController, getTransferByIdController, updateTransferStatus } from "../controllers/transferController";
import {authentication, editTransferauthentication} from "../middleware/jwtAuth";

const transferRouter = Router();

transferRouter.get('/transfers', authentication, getTransfersController);

transferRouter.get('/transfers/:id', authentication, getTransferByIdController);

transferRouter.post('/transfers', authentication, createTransfersController);

transferRouter.patch('/transfers/:id', editTransferauthentication, updateTransferStatus);

export default transferRouter