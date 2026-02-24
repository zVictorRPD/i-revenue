import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { InfoCardProps } from "@/types/global";

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