import path from 'path';
import express, { Express } from 'express';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import { router } from './routes';
import { errorHandler } from './middlewares/error-handler';

const swaggerDoc = YAML.load(path.join(__dirname, './swagger.yaml'));

export const server: Express = express();
server.use(express.json());
server.use(cors());
server.use(express.raw({ type: 'image/*', limit: '2mb' }));

server.use('/api/v1', router);
server.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(swaggerDoc)));

server.use(errorHandler);
