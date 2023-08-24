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
exports.loginUser = exports.createUserController = exports.getUsersController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
            const { username, password, role } = req.body;
            // const validatingUserMessage = await validatingUser(username, password);
            // if (validatingUserMessage.length > 0) {
            //     return res.json(validatingUserMessage)
            // }
            const hashedPaswword = yield bcrypt_1.default.hash(password, 10);
            const newUser = {
                username,
                password: hashedPaswword,
                role
            };
            const newUserAdded = yield (0, user_1.createUser)(newUser);
            res.send("Berhasil membuat USER");
        }
        catch (error) {
            res.json(error);
        }
    });
}
exports.createUserController = createUserController;
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            const secretKey = "test token secret";
            const user = yield (0, user_1.getUserByUsername)(username);
            if (!user) {
                return res.json("user can't be found");
            }
            const passwordIsMatched = yield bcrypt_1.default.compare(password, user.password);
            if (!passwordIsMatched) {
                return res.json("Wrong password");
            }
            const userToken = jsonwebtoken_1.default.sign(user, secretKey);
            res.json({
                message: "User succesfully logged in",
                token: userToken
            });
        }
        catch (error) {
        }
    });
}
exports.loginUser = loginUser;
