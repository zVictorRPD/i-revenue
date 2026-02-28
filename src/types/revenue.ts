import type { BenefitType, RevenueType } from "./global";
import { revenueCyclesArray } from "./forms/revenue/form";

export type Revenue = {
  id: number;
  name: string;
  type: RevenueType;
  cycle: typeof revenueCyclesArray[number];
  min_revenue: number;
  max_revenue: number;
  benefits?: {
    id: number;
    type: BenefitType;
    name: string;
    value: number;
    cycle: typeof revenueCyclesArray[number];
  }[];
  taxes?: {
    name: string;
    value: number;
    cycle: typeof revenueCyclesArray[number];
  }[];
}

export type CalculatedRevenueData = {
  total_min_revenue: number;
  total_max_revenue: number;
  total_benefits: number;
  total_taxes: number;
};