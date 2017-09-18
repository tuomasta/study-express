import { Router } from 'express';

export interface IRouteDefinition {
    baseUri: string;
    router: Router;
}
