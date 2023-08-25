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
exports.editTransferauthentication = exports.authentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = "test token secret";
function authentication(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return res.json("Unauthorized access");
        }
        try {
            const decodedToken = jsonwebtoken_1.default.verify(token, secretKey);
            if (decodedToken.role != "admin" && decodedToken.role != "approver" && decodedToken.role != "maker") {
                return res.status(401).json("only admin, approver, and maker can access this");
            }
            next();
        }
        catch (error) {
            return res.json({ "message": "Invalid token" });
        }
    });
}
exports.authentication = authentication;
function editTransferauthentication(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return res.json("Unauthorized access");
        }
        try {
            const decodedToken = jsonwebtoken_1.default.verify(token, secretKey);
            if (decodedToken.role != "admin" && decodedToken.role != "approver") {
                return res.status(401).json("only admin, and approver can access this");
            }
            next();
        }
        catch (error) {
            return res.json({ "message": "Invalid token" });
        }
    });
}
exports.editTransferauthentication = editTransferauthentication;
