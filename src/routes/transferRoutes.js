"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transferController_1 = require("../controllers/transferController");
const transferRouter = (0, express_1.Router)();
transferRouter.get('/transfers', transferController_1.getTransfersController);
transferRouter.post('/transfers', transferController_1.createTransfersController);
exports.default = transferRouter;
