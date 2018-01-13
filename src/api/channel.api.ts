import { Router, Request, Response, NextFunction } from 'express';
import { IRouteDefinition } from '../interfaces/route-definition.interface';
import { IMessage } from '../interfaces/message.interface';
import { MessageRepository } from '../repositories/message.repository';

export class ChannelApi {
  /**
   * Initialize the ChannelApi
   */
  constructor(private messageRepo: MessageRepository, private router: Router) {
  }

  /**
   * GET message for a channel
   */
  public getChannelMessages(req: Request, res: Response, next: NextFunction) {
    const channel = req.params.channel;

    this.messageRepo.findMessageByChannel(channel).then(messages => {
      const toDate = req.query.toDate;
      const fromDate = req.query.fromIndex;

      // TODO there should be actually channel api which does this on join
      let channelMessages = [{
        created: Date.now(),
        sender: 'chatbot',
        text: `Hello there, welcome to @${channel}`,
        },
        ...messages,
      ];

      if (fromDate) channelMessages = channelMessages.filter(m => m.created > fromDate);
      if (toDate) channelMessages = channelMessages.filter(m => m.created < toDate);

      res.send(channelMessages);
    });
  }

  /**
   * POST message to a channel
   */
  public createMessages(req: Request, res: Response, next: NextFunction) {
    const channel = req.params.channel;
    const message = req.body as IMessage;
    // TODO better validation
    if (!channel || !message) {
      res.status(400).send(`invalid message posted ${channel}, ${JSON.stringify(message)}`);
      return;
    }

    message.channel = channel;
    this.messageRepo.save(message).then(
      () => res.status(201).send(),
      reason => res.status(400).send(reason));
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
