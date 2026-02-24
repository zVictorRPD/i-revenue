import type { BenefitType, RevenueType } from "./global";

export type Revenue = {
  id: number;
  name: string;
  type: RevenueType;
  cycle: 'monthly' | 'yearly';
  min_revenue: number;
  max_revenue: number;
  benefits?: {
    id: number;
    type: BenefitType;
    name: string;
    value: number;
    cycle: 'monthly' | 'yearly';
  }[];
  taxes?: {
    name: string;
    value: number;
    cycle: 'monthly' | 'yearly';
  }[];
}