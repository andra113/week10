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
exports.createTransfersController = exports.getTransfersController = void 0;
const transfers_1 = require("../models/transfers");
function getTransfersController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transfers = yield (0, transfers_1.getAllTranfers)();
            res.json(transfers);
        }
        catch (error) {
            return;
        }
    });
}
exports.getTransfersController = getTransfersController;
function createTransfersController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { fromAccountId, toAccountId, amount, status, createdDate } = req.body;
            const newTransfer = { fromAccountId, toAccountId, amount, status, createdDate };
            const newTransferAdded = yield (0, transfers_1.createTransfers)(newTransfer);
            res.json("New trasnfer succesfully added");
        }
        catch (error) {
        }
    });
}
exports.createTransfersController = createTransfersController;
