"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransferByIdController = exports.createTransfersController = exports.getTransfersController = void 0;
const transfers_1 = require("../models/transfers");
function getTransfersController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transfers = yield (0, transfers_1.getAllTranfers)();
            res.json(transfers);
        }
        catch (error) {
            res.json(error);
        }
    });
}
exports.getTransfersController = getTransfersController;
function createTransfersController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { fromAccountId, toAccountId, amount } = req.body;
            const status = "pending";
            const createdDate = new Date();
            const newTransfer = { fromAccountId, toAccountId, amount, status, createdDate };
            const newTransferAdded = yield (0, transfers_1.createTransfers)(newTransfer);
            res.json({
                message: "New transfer succesfully added",
                data: newTransferAdded
            });
        }
        catch (error) {
            res.json(error);
        }
    });
}
exports.createTransfersController = createTransfersController;
function getTransferByIdController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const transferResult = yield (0, transfers_1.getTransferById)(id);
            if (!transferResult) {
                res.json({ message: "transfer can't be found" });
            }
            res.json(transferResult);
        }
        catch (error) {
            res.json(error);
        }
    });
}
exports.getTransferByIdController = getTransferByIdController;
