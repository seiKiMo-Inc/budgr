export type UserData = {};

/**
 * Used in budgets, expenses, etc.
 * Anything which has a dollar amount with a label will use this type.
 */
export type LabeledAmount = {
    label: string;
    amount: number;
};
