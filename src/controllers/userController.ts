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
        if (newUser.password.length < 8) {
            return res.send("Panjang password harus lebih dari 8")
        }

        if (!newUser.username || newUser.username.trim() === "") {
            return res.send("Username tidak boleh kosong")
        }

        const checkPassword = /^(?=.*[a-zA-Z])(?=.*\d).+$/.test(newUser.password)
        if (!checkPassword) {
            const thereIsLetter = /^(?=.*[a-zA-Z]).+$/.test(newUser.password)
            const thereIsNumber = /^(?=.*\d).+$/.test(newUser.password)
            if (!thereIsLetter) {
                return res.send("Password harus ada setidaknya 1 huruf")
            }
            if (!thereIsNumber) {
                return res.send("Password harus ada setidaknya 1 angka")
            }
        }

        const hashedPaswword = await bcrypt.hash(newUser.password, 10);
        newUser.password = hashedPaswword

        const newUserAdded = await createUser(newUser)
        res.send("Berhasil membuat USER")
    } catch (error) {
        return
    }
}