import * as http from 'http';
import * as debug from 'debug';

import App from './app';

// tslint:disable:no-console
const port = 4200;
App.set('port', port);

const server = http.createServer(App);
server.listen(port);
server.on('error', onError);

function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') throw error;
    switch (error.code) {
        case 'EACCES':
            console.error(`Port ${port} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`Port ${port} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}
