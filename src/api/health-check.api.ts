
import { NextFunction, Response, Request, Router } from 'express';
import { IRouteDefinition } from '../interfaces/route-definition.interface';

class HealthCheckApi {
    private router: Router = Router();

    public get(req: Request, res: Response, next: NextFunction) {
        return res.json({
            message: 'API works',
        });
    }

    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    public initRoutes(): IRouteDefinition {
        this.router.get('/', this.get.bind(this));
        return {
            baseUri: '/health-check',
            router: this.router,
        };
    }
}

export const healtCheckApi = new HealthCheckApi().initRoutes();
