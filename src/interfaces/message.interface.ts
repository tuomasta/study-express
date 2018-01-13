import { Schema, model, Document } from 'mongoose';
import * as uuid from 'uuid';

export interface IMessage {
    sender: string;
    text: string;
    channel: string;
    created: Date;
    id: string;
}
