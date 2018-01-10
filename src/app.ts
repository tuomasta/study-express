import * as path from 'path';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import routeDefintions from './routes';

const MONGODB_CONNECTION: string = 'mongodb://localhost:27017/messages';

// Creates and configures an ExpressJS web server.
class App {
    // ref to Express instance
    public express: express.Application;

    // Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.database();
        this.middleware();
        this.routes();
    }

    // configure database
    private database(): any {
        // mongoose.Promise = Promise;
        mongoose.connect(MONGODB_CONNECTION);
        mongoose.connection.on('error', () => {
            // tslint:disable-next-line:max-line-length
            console.log(`Failed to connect MongoDB with connections string [${MONGODB_CONNECTION}]. Please make sure MongoDB is running.`);
            process.exit();
        });
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
        routeDefintions.forEach(r => {
            this.express.use(r.baseUri, r.router);
        });
    }

}

export default new App().express;
