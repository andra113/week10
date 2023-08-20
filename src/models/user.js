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
exports.getUserByUsername = exports.createUser = exports.getAllUsers = void 0;
const mongoDB_1 = __importDefault(require("../config/mongoDB"));
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, mongoDB_1.default)();
        const userCollection = db.collection('users');
        const users = yield userCollection.find().toArray();
        return users;
    });
}
exports.getAllUsers = getAllUsers;
function createUser(newUser) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, mongoDB_1.default)();
        const userCollection = db.collection('users');
        const newUserAdd = yield userCollection.insertOne(newUser);
        return newUserAdd;
    });
}
exports.createUser = createUser;
function getUserByUsername(userName) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, mongoDB_1.default)();
        const userCollection = db.collection('users');
        const userResult = yield userCollection.findOne({ username: userName });
        return userResult;
    });
}
exports.getUserByUsername = getUserByUsername;
