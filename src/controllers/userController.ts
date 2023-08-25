import { Request,Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import { getAllUsers, createUser, getUserByUsername } from "../models/user";
import { validatingUser } from "../utils/userValidationResponse";
import bcrypt from "bcrypt"
import { secretKey } from "../middleware/jwtAuth";

export async function getUsersController(req:Request, res : Response) {
    try {
        const users = await getAllUsers()
        res.json(users)
    } catch (error) {
        return
    }
}

export async function createUserController(req:Request, res : Response, next: NextFunction) {
    try {
        const {username, password, role} = req.body

        if (!username || username.trim() === "") {
            return res.status(400).json({
                error: 'Invalid Username',
                message: 'Username cannot be empty or contain only whitespace.'
            });
        }

        const checkUsername = await getUserByUsername(username);
        if (checkUsername != null) {
            return res.status(409).json({ 
                error: 'Username already exists',
                message: 'The chosen username is not available. Please choose a different username.'
            });
        }
        
        const hashedPaswword = await bcrypt.hash(password, 10);

        const newUser = {
            username, 
            password: hashedPaswword, 
            role};

        const newUserAdded = await createUser(newUser)
        res.json({
            message: "Sucessfully register",
            data: {
                id: newUserAdded.insertedId.toString()
            }
        })
    } catch (error) {
        next(error)
    }
}

export async function loginUser(req: Request, res: Response) {
    try {
        const { username, password} = req.body;
        const user = await getUserByUsername(username);
        if (!user) {
            return res.status(404).json({message: "user can't be found"})
    }

        const passwordIsMatched = await bcrypt.compare(password, user.password)
        if (!passwordIsMatched) {
            return res.status(401).json({message: "Incorrect password"})
        }
        const userToken = jwt.sign(user, secretKey)
        res.status(200).json({
            message: "User succesfully logged in",
            token: userToken
        })
    } catch (error) {

    }
}