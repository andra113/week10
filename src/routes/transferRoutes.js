"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transferController_1 = require("../controllers/transferController");
const jwtAuth_1 = __importDefault(require("../middleware/jwtAuth"));
const transferRouter = (0, express_1.Router)();
transferRouter.get('/transfers', jwtAuth_1.default, transferController_1.getTransfersController);
transferRouter.get('/transfers/:id', jwtAuth_1.default, transferController_1.getTransferByIdController);
transferRouter.post('/transfers', transferController_1.createTransfersController);
exports.default = transferRouter;
