import { Request,Response } from "express";
import { getAllUsers, createUser } from "../models/user";

export async function getUsersController(req:Request, res : Response) {
    try {
        const users = await getAllUsers()
        res.json(users)
    } catch (error) {
        return
    }
}