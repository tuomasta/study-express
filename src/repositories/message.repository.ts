import * as uuid from 'uuid';
import { Schema, model, Document } from 'mongoose';
import { IMessage } from '../interfaces/message.interface';

const messageSchema: Schema = new Schema({
    channel: String,
    created: Date,
    text: String,
    sender: String,
    id: String,
});

const Message = model<IMessage & Document>('Message', messageSchema);

export class MessageRepository {
    public save(message: IMessage): Promise<IMessage> {
        if (!message.id) message.id = uuid.v4();
        if (!message.created) message.created = new Date();
        return new Message(message).save();
    }

    public findMessageByChannel(channel: string): Promise<IMessage[]> {
        const findby = {
            channel,
        };

        // TODO make this properly
        return Message.find(findby) as any;
    }
}
