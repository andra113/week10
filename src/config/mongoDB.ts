import { MongoClient, Db } from "mongodb";

const uri = "mongodb+srv://andradwikasa:3bZ8AFzRt5Sk1T6K@cluster0.wowqlzw.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const dbName = 'RevoU';
const pass = "3bZ8AFzRt5Sk1T6K"

async function connectToDatabase(): Promise<Db> {
    await client.connect();
    console.log("Connected to database")
    const db = client.db(dbName);
    return db
}

export default connectToDatabase;

