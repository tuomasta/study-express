import { Schema } from "mongoose";
import * as uuid from 'uuid';

export interface IMessage {
    sender: string;
    text: string;
    created: Date;
    id: string;
}

export var messageSchema: Schema = new Schema({
    created: Date,
    text: String,
    sender: String,
    id: String
});

// generate id's and set current date as created date when adding new message
messageSchema.pre("save", function(next) {
    if (!this.id) this.id = uuid.v4();
    if (!this.created) this.created = Date();
    next();
});