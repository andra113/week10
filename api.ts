import express, { Express, NextFunction, ErrorRequestHandler} from "express";
import * as dotenv from "dotenv";
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from "swagger-jsdoc";
import * as OpenApiValidator from "express-openapi-validator";
import cors from "cors";
import router from "./src/routes/router";
import transferRouter from "./src/routes/transferRoutes";
import errorHandler from "./src/middleware/errorHandler";

import * as fs from 'fs';
import * as yaml from 'js-yaml';

const yamlContent = fs.readFileSync('doc/apiDoc.yaml', 'utf8');
const swaggerDocument: any = yaml.load(yamlContent)


dotenv.config()

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(
  OpenApiValidator.middleware({
    apiSpec: swaggerDocument,
    validateRequests: true, // (default)
    validateResponses: true, // false by default
  }),
);
app.use('/api', router)
app.use('/api', transferRouter)
app.use(errorHandler)




app.listen(port, () => {
  console.log(`server listen ${port}`);
});