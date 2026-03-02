import type { AllIconTypes, TypeIconsProps } from "@/types/global";
import {
  AsteriskIcon,
  BabyIcon,
  BookIcon,
  BriefcaseIcon,
  CarFrontIcon,
  DogIcon,
  ForkKnifeCrossedIcon,
  HandshakeIcon,
  HeartPulseIcon,
  HomeIcon,
  ShirtIcon,
  SofaIcon,
  TheaterIcon,
  ToolCaseIcon,
  Tv2Icon,
} from "lucide-react";
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
    education: <BookIcon className={className} />,
    childcare: <BabyIcon className={className} />,
    clothing: <ShirtIcon className={className} />,
    entertainment: <TheaterIcon className={className} />,
    subscriptions: <Tv2Icon className={className} />,
    house: <HomeIcon className={className} />,
    pets: <DogIcon className={className} />,
    insurance: <HeartPulseIcon className={className} />,
    leisure: <SofaIcon className={className} />,
    personal: <HandshakeIcon className={className} />,
    utilities: <ToolCaseIcon className={className} />,
    other: <AsteriskIcon className={className} />,
  } as Record<AllIconTypes, JSX.Element>;

  return icons[type] || <AsteriskIcon className={className} />;
}
