import { error } from "console";
import { Request, Response, NextFunction} from "express";

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    // format error
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
    });
}

export default errorHandler