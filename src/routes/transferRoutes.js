"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transferController_1 = require("../controllers/transferController");
const jwtAuth_1 = require("../middleware/jwtAuth");
const transferRouter = (0, express_1.Router)();
transferRouter.get('/transfers', jwtAuth_1.authentication, transferController_1.getTransfersController);
transferRouter.get('/transfers/:id', jwtAuth_1.authentication, transferController_1.getTransferByIdController);
transferRouter.post('/transfers', jwtAuth_1.authentication, transferController_1.createTransfersController);
transferRouter.patch('/transfers/:id', jwtAuth_1.editTransferauthentication, transferController_1.updateTransferStatus);
exports.default = transferRouter;
