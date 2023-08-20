import express, { Express} from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import router from "./src/routes/router";

dotenv.config()

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/api', router)



app.listen(port, () => {
  console.log(`server listen ${port}`);
});