import { Router, Request, Response, NextFunction } from 'express';
import { IRouteDefinition } from '../interfaces/route-definition.interface';
import { IMessage } from '../models/message';

export class ChannelApi {
  private router: Router;

  private messages: Map<string, IMessage[]> = new Map<string, IMessage[]>();

  /**
   * Initialize the ChannelApi
   */
  constructor() {
    this.router = Router();
  }

  /**
   * GET message for a channel
   */
  public getChannelMessages(req: Request, res: Response, next: NextFunction) {
    const channel = req.params.channel;
    let channelMessages = [{
      sender: 'chatbot',
      text: `Hello there, welcome to @${channel}`,
    },
    ...this.messages.get(channel) || [],
    ];

    // TODO should use dates
    const toIndex = Math.min(+req.query.toIndex || Number.MAX_VALUE, channelMessages.length);
    const fromIndex = Math.min(+req.query.fromIndex || 0, toIndex);

    // if user specifies a filter then return only that part
    channelMessages = channelMessages.slice(fromIndex, toIndex);

    res.send(channelMessages);
  }

  /**
   * POST message to a channel
   */
  public createMessages(req: Request, res: Response, next: NextFunction) {
    const channel = req.params.channel;
    const message = req.body;

    if (!channel || !message) {
      res.status(400).send(`invalid message posted ${channel}, ${JSON.stringify(message)}`);
      return;
    }

    if (!this.messages.has(channel)) this.messages.set(channel, []);
    this.messages.get(channel).push(message);

    res.status(201).send();
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  public initRoutes(): IRouteDefinition {
    this.router.get('/:channel/messages', this.getChannelMessages.bind(this));
    this.router.post('/:channel/messages', this.createMessages.bind(this));
    return {
      baseUri: '/api/v1/channel',
      router: this.router,
    };
  }
}

// Create the ChannelApi, and export its configured Express.Router

export const channelApi = new ChannelApi().initRoutes();
