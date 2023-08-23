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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransferById = exports.createTransfers = exports.getAllTranfers = void 0;
const mongoDB_1 = __importDefault(require("../config/mongoDB"));
const mongodb_1 = require("mongodb");
function getAllTranfers() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, mongoDB_1.default)();
        const transferCollection = db.collection('transfers');
        const transfers = yield transferCollection.find().toArray();
        return transfers;
    });
}
exports.getAllTranfers = getAllTranfers;
function createTransfers(newTransfer) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, mongoDB_1.default)();
        const transferCollection = db.collection('transfers');
        const newTransferAdd = yield transferCollection.insertOne(newTransfer);
        return newTransferAdd;
    });
}
exports.createTransfers = createTransfers;
function getTransferById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, mongoDB_1.default)();
        const transferCollection = db.collection('transfers');
        const transferResult = yield transferCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
        return transferResult;
    });
}
exports.getTransferById = getTransferById;
// export async function getUserByUsername(userName: string) {
//     const db = await connectToDatabase();
//     const userCollection = db.collection('users');
//     const userResult = await userCollection.findOne({username: userName});
//     return userResult   
// }
