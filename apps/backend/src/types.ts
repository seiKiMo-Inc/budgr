import type { Types } from "mongoose";

export type UserData = unknown;

export type Reminder = {
    _id: Types.UUID;

    /**
     * The label of the reminder.
     * This will be shown to the user.
     */
    label: string;

    /**
     * The associated payment in Budgr.
     */
    // payment: Types.UUID | undefined;
};

/**
 * Used in budgets, expenses, etc.
 * Anything which has a dollar amount with a label will use this type.
 */
export type LabeledAmount = {
    label: string;
    amount: number;
};
