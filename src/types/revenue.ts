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