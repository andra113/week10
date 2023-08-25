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
const jwtAuth_1 = require("../middleware/jwtAuth");
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
function createUserController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password, role } = req.body;
            if (!username || username.trim() === "") {
                return res.status(400).json({
                    error: 'Invalid Username',
                    message: 'Username cannot be empty or contain only whitespace.'
                });
            }
            const checkUsername = yield (0, user_1.getUserByUsername)(username);
            if (checkUsername != null) {
                return res.status(409).json({
                    error: 'Username already exists',
                    message: 'The chosen username is not available. Please choose a different username.'
                });
            }
            const hashedPaswword = yield bcrypt_1.default.hash(password, 10);
            const newUser = {
                username,
                password: hashedPaswword,
                role
            };
            const newUserAdded = yield (0, user_1.createUser)(newUser);
            res.json({
                message: "Sucessfully register",
                data: {
                    id: newUserAdded.insertedId.toString()
                }
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.createUserController = createUserController;
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            const user = yield (0, user_1.getUserByUsername)(username);
            if (!user) {
                return res.status(404).json({ message: "user can't be found" });
            }
            const passwordIsMatched = yield bcrypt_1.default.compare(password, user.password);
            if (!passwordIsMatched) {
                return res.status(401).json({ message: "Incorrect password" });
            }
            const userToken = jsonwebtoken_1.default.sign(user, jwtAuth_1.secretKey);
            res.status(200).json({
                message: "User succesfully logged in",
                token: userToken
            });
        }
        catch (error) {
        }
    });
}
exports.loginUser = loginUser;
