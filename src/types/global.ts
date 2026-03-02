import type { ReactNode } from "react";
import { revenueBenefitsArray, revenueTypesArray } from "./forms/revenue/form";
import type { expenseTypesArray } from "./forms/expense/form";

export type InfoCardProps = {
  title: string;
  value: string;
  icon?: ReactNode;
  loading?: boolean;
}

export type PageHeaderProps = {
  title: string;
  button?: {
    text: string;
    action: () => void;
    icon?: React.ReactNode;
  }
}

export type ExpenseType = typeof expenseTypesArray[number];
export type RevenueType = typeof revenueTypesArray[number];
export type BenefitType = typeof revenueBenefitsArray[number];
export type AllIconTypes = RevenueType | BenefitType | ExpenseType;
export type TypeIconsProps = {
  type: AllIconTypes;
  className?: string;
}