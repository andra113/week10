import { Response, Request, NextFunction } from "express"
import jwt from "jsonwebtoken"

async function authentication(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1]!;
    
    if (!token) {
       return res.json("Unauthorized access");
    }
    const secretKey = "test token secret";

    try {
        const decodedToken = jwt.verify(token, secretKey) as {role: string};

        if (decodedToken.role != "admin" && decodedToken.role != "approver" && decodedToken.role != "maker") {
         return res.status(401).json("only admin, approver, maker can access this");
        }

        next()

    } catch (error) {
        return res.json({"message": "Invalid token"})
    }
}

export default authentication