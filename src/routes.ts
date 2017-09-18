import { IRouteDefinition } from './interfaces/route-definition.interface';
import { healtCheckApi } from './api/health-check.api';
import { channelApi } from './api/channel.api';

const routeDefinitions: IRouteDefinition[] = [
    healtCheckApi,
    channelApi,
];

export default routeDefinitions;
