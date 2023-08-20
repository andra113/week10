import { Request,Response } from "express";
import { getAllUsers, createUser } from "../models/user";
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
        const newUser = req.body

        if (newUser.password < 8) {
            return res.send("Panjang password harus lebih dari 8")
        }

        const hashedPaswword = await bcrypt.hash(newUser.password, 10);
        newUser.password = hashedPaswword

        const newUserAdded = await createUser(newUser)
        res.send("Berhasil membuat USER")
    } catch (error) {
        return
    }
}