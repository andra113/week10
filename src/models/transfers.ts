import connectToDatabase from "../config/mongoDB";
import { ObjectId } from "mongodb";

interface TransferModel {
    fromAccountId: number;
    toAccountId: number;
    amount: number;
    status: string;
    createdDate: string;
}

export async function getAllTranfers() {
    const db = await connectToDatabase();
    const transferCollection = db.collection('transfers');
    const transfers = await transferCollection.find().toArray();
    if (Array.isArray(transfers)) {
        console.log('The value is an array.');
    } else {
        console.log("value is not array")
    }
    return transfers;
}

export async function createTransfers(newTransfer: TransferModel) {
    const db = await connectToDatabase();
    const transferCollection = db.collection('transfers');
    const newTransferAdd = await transferCollection.insertOne(newTransfer);
    return newTransferAdd;
}

export async function getTransferById(id: string) {
    const db = await connectToDatabase();
    const transferCollection = db.collection('transfers');
    const transferResult = await transferCollection.findOne({_id: new ObjectId(id)});
    return transferResult;
}
// export async function getUserByUsername(userName: string) {
//     const db = await connectToDatabase();
//     const userCollection = db.collection('users');
//     const userResult = await userCollection.findOne({username: userName});
//     return userResult   
// }

