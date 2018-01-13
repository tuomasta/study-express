import { IRouteDefinition } from './interfaces/route-definition.interface';
import { HealthCheckApi } from './api/health-check.api';
import { ChannelApi } from './api/channel.api';
import { MessageRepository } from './repositories/message.repository';
import { Router } from 'express';

const messageRepo = new MessageRepository();
const channelApi = new ChannelApi(messageRepo, Router());
const healthCheckApi = new HealthCheckApi(Router());

const routeDefinitions: IRouteDefinition[] = [
    healthCheckApi.initRoutes(),
    channelApi.initRoutes(),
];

export default routeDefinitions;
