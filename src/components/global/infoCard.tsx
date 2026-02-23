import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ReactNode } from "react";

type InfoCardProps = {
  title: string;
  value: string;
  icon?: ReactNode;
}

export function InfoCard({ title, value, icon }: InfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-xl font-semibold tabular-nums">
          {value}
        </CardTitle>
        {icon && (
          <CardAction>
            {icon}
          </CardAction>
        )}
      </CardHeader>
    </Card>
  )
}