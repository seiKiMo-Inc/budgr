import { Schema, model } from "mongoose";

import type { Reminder as ReminderType } from "@/types.ts";

const reminderSchema = new Schema<ReminderType>(
    {
        _id: Schema.Types.UUID,
        label: { type: String, required: true },
        // payment: { type: Schema.Types.UUID, required: false }
    }
);


export const Reminder = model<ReminderType>("Reminder", reminderSchema);
