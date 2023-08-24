import { Request, Response, NextFunction } from "express";

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    // Format error
    if (err.name === 'UsernameUnavailableError') {
        console.log(err.status)
        res.status(409).json({ error: err.message });
    }
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
    });
}

export default errorHandler;
