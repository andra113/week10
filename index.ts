import express, { Express} from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import router from "./src/routes/router";
import transferRouter from "./src/routes/transferRoutes";

dotenv.config()

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/api', router)
app.use('/api', transferRouter)



app.listen(port, () => {
  console.log(`server listen ${port}`);
});