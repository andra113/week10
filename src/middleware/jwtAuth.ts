import { Response, Request, NextFunction } from "express"
import jwt from "jsonwebtoken"
import * as dotenv from "dotenv"

dotenv.config()

export const secretKey = process.env.SECRET_KEY!;

export async function authentication(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1]!;
    
    if (!token) {
        return res.json({message: "Unauthorized access"});
    }
    

    try {
        const decodedToken = jwt.verify(token, secretKey) as {role: string};

        if (decodedToken.role != "admin" && decodedToken.role != "approver" && decodedToken.role != "maker") {
            return res.status(401).json({message: "only admin, approver, and maker can access this"});
        }

        next()

    } catch (error) {
        return res.json({message: "Invalid token"})
    }
}

export async function editTransferauthentication(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1]!;
    
    if (!token) {
        return res.json("Unauthorized access");
    }
    

    try {
        const decodedToken = jwt.verify(token, secretKey) as {role: string};

        if (decodedToken.role != "admin" && decodedToken.role != "approver") {
            return res.status(401).json({message: "only admin, and approver can access this"});
        }

        next()

    } catch (error) {
        return res.json({message: "Invalid token"})
    }
}
