import { Request,Response } from "express";
import jwt from "jsonwebtoken"
import { getAllUsers, createUser, getUserByUsername } from "../models/user";
import { validatingUser } from "../utils/userValidationResponse";
import bcrypt from "bcrypt"

export async function getUsersController(req:Request, res : Response) {
    try {
        const users = await getAllUsers()
        res.json(users)
    } catch (error) {
        return
    }
}

export async function createUserController(req:Request, res : Response) {
    try {
        const {username, password, role} = req.body

        const validatingUserMessage = await validatingUser(username, password);
        
        if (validatingUserMessage.length > 0) {
            return res.json(validatingUserMessage)
        }
        
        const hashedPaswword = await bcrypt.hash(password, 10);

        const newUser = {
            username, 
            password: hashedPaswword, 
            role};

        const newUserAdded = await createUser(newUser)
        res.send("Berhasil membuat USER")
    } catch (error) {
        res.json(error)
    }
}

export async function loginUser(req: Request, res: Response) {
    try {
        const { username, password} = req.body;
        const secretKey = "test token secret"
        const user = await getUserByUsername(username);
        if (!user) {
            return res.json("user can't be found")
    }

        const passwordIsMatched = await bcrypt.compare(password, user.password)
        if (!passwordIsMatched) {
            return res. json("Wrong password")
        }
        const userToken = jwt.sign(user, secretKey)
        res.json({
            message: "User succesfully logged in",
            token: userToken
        })
    } catch (error) {

    }
}