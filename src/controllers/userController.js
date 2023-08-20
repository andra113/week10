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
exports.createUserController = exports.getUsersController = void 0;
const user_1 = require("../models/user");
function getUsersController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield (0, user_1.getAllUsers)();
            res.json(users);
        }
        catch (error) {
            return;
        }
    });
}
exports.getUsersController = getUsersController;
function createUserController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newUser = req.body;
            if (newUser.password < 8) {
                return res.send("Panjang password harus lebih dari 8");
            }
            const newUserAdded = yield (0, user_1.createUser)(newUser);
            res.send("Berhasil membuat USER");
        }
        catch (error) {
            return;
        }
    });
}
exports.createUserController = createUserController;
