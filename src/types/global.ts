import type { ReactNode } from "react";
import { revenueBenefitsArray, revenueTypesArray } from "./forms/revenue/form";

export type InfoCardProps = {
  title: string;
  value: string;
  icon?: ReactNode;
}

export type PageHeaderProps = {
  title: string;
  button?: {
    text: string;
    action: () => void;
    icon?: React.ReactNode;
  }
}

export type RevenueType = typeof revenueTypesArray[number];
export type BenefitType = typeof revenueBenefitsArray[number];
export type AllIconTypes = RevenueType | BenefitType;
export type TypeIconsProps = {
  type: AllIconTypes;
  className?: string;
}