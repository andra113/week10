import { Request, Response } from "express";
import connectToDatabase from "../models/mongoDB";

export async function getAllUsers(req: Request, res: Response) {
    try {
        const db = await connectToDatabase();
        const userCollection = db.collection('users');
        const users = await userCollection.find().toArray();
        res.json(users)
    } catch(error){
        
    }
}