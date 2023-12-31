"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const OpenApiValidator = __importStar(require("express-openapi-validator"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./src/routes/router"));
const transferRoutes_1 = __importDefault(require("./src/routes/transferRoutes"));
const errorHandler_1 = __importDefault(require("./src/middleware/errorHandler"));
const fs = __importStar(require("fs"));
const yaml = __importStar(require("js-yaml"));
const yamlContent = fs.readFileSync('doc/apiDoc.yaml', 'utf8');
const swaggerDocument = yaml.load(yamlContent);
dotenv.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.use(OpenApiValidator.middleware({
    apiSpec: swaggerDocument,
    validateRequests: true,
    validateResponses: true, // false by default
}));
app.use('/api', router_1.default);
app.use('/api', transferRoutes_1.default);
app.use(errorHandler_1.default);
app.listen(port, () => {
    console.log(`server listen ${port}`);
});
