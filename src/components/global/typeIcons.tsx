import type { AllIconTypes, TypeIconsProps } from "@/types/global";
import { BriefcaseIcon, CarFrontIcon, ForkKnifeCrossedIcon, HandshakeIcon, HeartPulseIcon } from "lucide-react";
import type { JSX } from "react";

export function TypeIcons({ type, className }: TypeIconsProps) {
  const icons = {
    food: <ForkKnifeCrossedIcon className={className} />,
    health: <HeartPulseIcon className={className} />,
    transport: <CarFrontIcon className={className} />,
    clt: <BriefcaseIcon className={className} />,
    pj: <HandshakeIcon className={className} />,
    freelance: <BriefcaseIcon className={className} />,
    donation: <HeartPulseIcon className={className} />,
    other: <BriefcaseIcon className={className} />
  
  } as Record<AllIconTypes, JSX.Element>;

  return icons[type] || <BriefcaseIcon className={className} />;
}