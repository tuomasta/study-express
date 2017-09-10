import * as path from 'path';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import messageRoutes from './api/channel.api';

// Creates and configures an ExpressJS web server.
class App {

    // ref to Express instance
    public express: express.Application;

    // Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    // Configure Express middleware.
    private middleware(): void {
        // ENABLING ALL CORS, note not for production
        this.express.use(cors());
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    // Configure API endpoints.
    private routes(): void {
        const router = express.Router();
        // placeholder route handler
        router.get('/health-check', (req, res, next) => {
            res.json({
                message: 'API works',
            });
        });
        this.express.use('/', router);
        this.express.use('/api/v1/channel', messageRoutes);
    }

}

export default new App().express;
