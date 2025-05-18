import { Schema, type Types, model } from "mongoose";
import type { LabeledAmount } from "@/types.ts";

const expenseSchema = new Schema<LabeledAmount>({
    label: String,
    amount: Number
});

export interface BudgetCategory {
    label: string;
    expenses: LabeledAmount[];
}

const categorySchema = new Schema<BudgetCategory>({
    label: String,
    expenses: [expenseSchema]
});

export interface Budget {
    _id: Types.UUID;
    categories: BudgetCategory[];
}

const budgetSchema = new Schema<Budget>(
    {
        _id: Schema.Types.UUID,
        categories: [categorySchema]
    }
);

export const Budget = model<Budget>("Budget", budgetSchema);
