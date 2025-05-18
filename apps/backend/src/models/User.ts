import { Schema, type Types, model } from "mongoose";

export interface UserIncome {
    label: string;
    amount: number;
}

const incomeSchema = new Schema<UserIncome>({
    label: String,
    amount: Number
});

export interface User {
    _id: Types.UUID;
    profile: Types.UUID;
    budget: Types.UUID;
    reminders: Types.UUID[];
    income: UserIncome[];
}

const userSchema = new Schema<User>(
    {
        _id: Schema.Types.UUID,
        profile: {
            type: Schema.Types.UUID,
            ref: "Profile"
        },
        budget: {
            type: Schema.Types.UUID,
            ref: "Budget"
        },
        reminders: [
            {
                type: Schema.Types.UUID,
                ref: "Reminder"
            }
        ],
        income: [incomeSchema]
    }
);

export const User = model<User>("User", userSchema);
