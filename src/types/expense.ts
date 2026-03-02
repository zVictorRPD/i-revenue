import type { BenefitType, ExpenseType } from "./global";
import { expenseCyclesArray } from "./forms/expense/form";

export type Expense = {
  id: number;
  name: string;
  type: ExpenseType;
  cycle: typeof expenseCyclesArray[number];
  min_expense: number;
  max_expense: number;
  benefits?: {
    id: number;
    type: BenefitType;
    name: string;
    value: number;
    cycle: typeof expenseCyclesArray[number];
  }[];
  taxes?: {
    name: string;
    value: number;
    cycle: typeof expenseCyclesArray[number];
  }[];
}

export type CalculatedExpenseData = {
  total_min_expense: number;
  total_max_expense: number;
};