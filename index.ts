import express, { Express} from "express";
import * as dotenv from "dotenv";
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from "swagger-jsdoc";
import cors from "cors";
import router from "./src/routes/router";
import transferRouter from "./src/routes/transferRoutes";

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API',
      version: '1.0.0',
      description: 'API documentation using Swagger',
    },
    servers: [
      {
        url: 'http://localhost:4000',
      },
    ],
  },
  apis: ['src/routes/*.js'],
};

const specs = swaggerJSDoc(options);

dotenv.config()

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api', router)
app.use('/api', transferRouter)



app.listen(port, () => {
  console.log(`server listen ${port}`);
});