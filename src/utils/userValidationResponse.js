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
exports.validatingUser = void 0;
const user_1 = require("../models/user");
const userValidation = {
    userNameExist: "Username already exist",
    userIsBlank: "Username can't be blank",
    passwordMinLength: "Password min length is 8",
    passwordNoNumber: "Password must be one number at least",
    passwordNoLetter: "Password must be one letter at least"
};
function validatingUser(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const errorMessage = [];
        if (password.length < 8) {
            errorMessage.push(userValidation.passwordMinLength);
        }
        if (!username || username.trim() === "") {
            errorMessage.push(userValidation.userIsBlank);
        }
        const existingAccount = yield (0, user_1.getUserByUsername)(username);
        if (existingAccount != null) {
            errorMessage.push(userValidation.userNameExist);
        }
        const checkPassword = /^(?=.*[a-zA-Z])(?=.*\d).+$/.test(password);
        if (!checkPassword) {
            const thereIsLetter = /^(?=.*[a-zA-Z]).+$/.test(password);
            const thereIsNumber = /^(?=.*\d).+$/.test(password);
            if (!thereIsLetter) {
                errorMessage.push(userValidation.passwordNoLetter);
            }
            if (!thereIsNumber) {
                errorMessage.push(userValidation.passwordNoLetter);
            }
        }
        return errorMessage;
    });
}
exports.validatingUser = validatingUser;
