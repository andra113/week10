import { Request, Response } from "express";
import { getAllTranfers, createTransfers, getTransferById } from "../models/transfers";

export async function getTransfersController(req:Request, res : Response) {
    try {
        const transfers = await getAllTranfers()
        res.json(transfers)
    } catch (error) {
        res.json (error)
    }
}

export async function createTransfersController (req: Request, res: Response) {
    try {
        const {fromAccountId, toAccountId, amount} = req.body

        const status = "pending";
        const createdDate = new Date();

        const newTransfer = {fromAccountId, toAccountId, amount, status, createdDate};

        const newTransferAdded = await createTransfers(newTransfer)

        res.json({
            message: "New transfer succesfully added",
            data: newTransferAdded
        });
    } catch (error) {
        res.json(error)
    }
}

export async function getTransferByIdController(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const transferResult = await getTransferById(id);
        if (!transferResult) {
            res.json({message: "transfer can't be found"})
        }

        res.json(transferResult)
        
    } catch (error) {
            res.json(error)
    }
}