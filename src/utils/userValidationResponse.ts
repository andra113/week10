import { error } from "console";
import { getUserByUsername } from "../models/user";

const userValidation = {
    userNameExist: "Username already exist",
    userIsBlank: "Username can't be blank",
    passwordMinLength: "Password min length is 8",
    passwordNoNumber: "Password must be one number at least",
    passwordNoLetter: "Password must be one letter at least"
}

export async function validatingUser (username: string, password: string) {
    const errorMessage: string[] = [];
    if (password.length < 8) {
        errorMessage.push(userValidation.passwordMinLength)
    }

    if (!username || username.trim() === "") {
        errorMessage.push(userValidation.userIsBlank)
    }

    const existingAccount = await getUserByUsername(username);
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
}