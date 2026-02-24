import type { ReactNode } from "react";

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

export type RevenueType = 'clt' | 'pj' | 'freelance' | 'donation' | 'other';
export type BenefitType = 'food' | 'health' | 'transport';
export type AllIconTypes = RevenueType | BenefitType;
export type TypeIconsProps = {
  type: AllIconTypes;
  className?: string;
}