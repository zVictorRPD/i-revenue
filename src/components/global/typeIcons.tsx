import { BriefcaseIcon, CarFrontIcon, ForkKnifeCrossedIcon, HandshakeIcon, HeartPulseIcon } from "lucide-react";
import type { JSX } from "react";

export type RevenueType = 'clt' | 'pj';
export type BenefitType = 'food' | 'health' | 'transport';

export type AllIconTypes = RevenueType | BenefitType;

type TypeIconsProps = {
  type: AllIconTypes;
  className?: string;
}

export function TypeIcons({ type, className }: TypeIconsProps) {
  const icons = {
    food: <ForkKnifeCrossedIcon className={className} />,
    health: <HeartPulseIcon className={className} />,
    transport: <CarFrontIcon className={className} />,
    clt: <BriefcaseIcon className={className} />,
    pj: <HandshakeIcon className={className} />
  } as Record<AllIconTypes, JSX.Element>;

  return icons[type] || null;
}