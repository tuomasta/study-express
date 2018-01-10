import { Schema, model, Model, Document } from 'mongoose';
import * as uuid from 'uuid';

interface IMessage extends Document {
    sender: string;
    text: string;
    channel: string;
    created: Date;
    id: string;
}

interface IMessageFunctions {
    findByChannel(channel: string): Promise<IMessage[]>;
}

const messageSchema: Schema = new Schema({
    channel: String,
    created: Date,
    text: String,
    sender: String,
    id: String,
});

// generate id's and set current date as created date when adding new message
messageSchema.pre('save', function(next) {
    if (!this.id) this.id = uuid.v4();
    if (!this.created) this.created = Date();
    next();
});

// method to find messages by channel
messageSchema.static('findByChannel',
    (channel: string) => {
        const findby = {
            channel,
        };
        return Message.find(findby);
    });

export type IMessageModel = Model<IMessage> & IMessageFunctions;

export const Message = model<IMessage>('Message', messageSchema) as IMessageModel;
