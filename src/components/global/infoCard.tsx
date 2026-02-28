import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { InfoCardProps } from "@/types/global";
import { Skeleton } from "../ui/skeleton";

export function InfoCard({
  title,
  value,
  icon,
  loading = false,
}: InfoCardProps) {
  return (
    <Card>
      <CardHeader>
        {!loading ? (
          <>
            <CardDescription>{title}</CardDescription>
            <CardTitle className="text-xl font-semibold tabular-nums">
              {value}
            </CardTitle>
            {icon && <CardAction>{icon}</CardAction>}
          </>
        ) : (
          <>
            <Skeleton className="w-20 h-5 mb-1" />
            <Skeleton className="w-36 h-6" />
          </>
        )}
      </CardHeader>
    </Card>
  );
}
