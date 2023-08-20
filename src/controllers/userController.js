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
exports.createUserController = exports.getUsersController = void 0;
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
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
            if (newUser.password.length < 8) {
                return res.send("Panjang password harus lebih dari 8");
            }
            if (!newUser.username || newUser.username.trim() === "") {
                return res.send("Username tidak boleh kosong");
            }
            const existingAccount = yield (0, user_1.getUserByUsername)(newUser.username);
            if (existingAccount != null) {
                return res.send("Username sudah ada");
            }
            const checkPassword = /^(?=.*[a-zA-Z])(?=.*\d).+$/.test(newUser.password);
            if (!checkPassword) {
                const thereIsLetter = /^(?=.*[a-zA-Z]).+$/.test(newUser.password);
                const thereIsNumber = /^(?=.*\d).+$/.test(newUser.password);
                if (!thereIsLetter) {
                    return res.send("Password harus ada setidaknya 1 huruf");
                }
                if (!thereIsNumber) {
                    return res.send("Password harus ada setidaknya 1 angka");
                }
            }
            const hashedPaswword = yield bcrypt_1.default.hash(newUser.password, 10);
            newUser.password = hashedPaswword;
            const newUserAdded = yield (0, user_1.createUser)(newUser);
            res.send("Berhasil membuat USER");
        }
        catch (error) {
            res.json(error);
        }
    });
}
exports.createUserController = createUserController;
