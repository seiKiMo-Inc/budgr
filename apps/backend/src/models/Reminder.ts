import { Schema, type Types, model } from "mongoose";

export interface Reminder {
    _id: Types.UUID;
    bill: string;
}

const reminderSchema = new Schema<Reminder>(
    {
        _id: Schema.Types.UUID,
        bill: String
    }
);


export const Reminder = model<Reminder>("Reminder", reminderSchema);
