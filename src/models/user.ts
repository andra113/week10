import connectToDatabase from "../config/mongoDB";

interface UserModel {
    name: string,
    password: string,
    role: string
}

export async function getAllUsers() {
    const db = await connectToDatabase();
    const userCollection = db.collection('users');
    const users = await userCollection.find().toArray();
    return users
}

export async function createUser(newUser: UserModel) {
    const db = await connectToDatabase();
    const userCollection = db.collection('users');
    const newUserAdd = await userCollection.insertOne(newUser);
    return newUserAdd
}