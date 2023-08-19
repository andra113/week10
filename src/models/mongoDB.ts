import { MongoClient, Db } from "mongodb";

const uri = "mongodb+srv://andradwikasa:3bZ8AFzRt5Sk1T6K@cluster0.wowqlzw.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const db = 'RevoU';
const pass = "3bZ8AFzRt5Sk1T6K"

async function connectToDatabase(): Promise<Db> {
    await client.connect();
    console.log("Connected to database")
    return client.db(db);
}

export default connectToDatabase;

