import {
  Status,
  StatusBackgroundColor,
  StatusBorderColor,
  StatusCircleColor,
} from '@/lib/types/status';
import { cn } from '@/lib/utils';

export default function StatusBadge({
  status,
  className,
}: {
  status: Status;
  className?: string;
}) {
  const backgroundVariant = {
    [Status.SUFFICIENT_STOCK]: StatusBackgroundColor.SUFFICIENT_STOCK,
    [Status.LOW_STOCK]: StatusBackgroundColor.LOW_STOCK,
    [Status.CRITICAL_STOCK]: StatusBackgroundColor.CRITICAL_STOCK,
    [Status.OUT_OF_STOCK]: StatusBackgroundColor.OUT_OF_STOCK,
  };
  const borderVariant = {
    [Status.SUFFICIENT_STOCK]: StatusBorderColor.SUFFICIENT_STOCK,
    [Status.LOW_STOCK]: StatusBorderColor.LOW_STOCK,
    [Status.CRITICAL_STOCK]: StatusBorderColor.CRITICAL_STOCK,
    [Status.OUT_OF_STOCK]: StatusBorderColor.OUT_OF_STOCK,
  };
  const circleVariant = {
    [Status.SUFFICIENT_STOCK]: StatusCircleColor.SUFFICIENT_STOCK,
    [Status.LOW_STOCK]: StatusCircleColor.LOW_STOCK,
    [Status.CRITICAL_STOCK]: StatusCircleColor.CRITICAL_STOCK,
    [Status.OUT_OF_STOCK]: StatusCircleColor.OUT_OF_STOCK,
  };
  return (
    <div
      className={cn(
        `rounded-md px-3 py-1  border flex gap-2 items-center text-${circleVariant[status]} text-sm h-9'`,
        className,
        backgroundVariant[status],
        borderVariant[status],
      )}
    >
      <div className={`rounded-full ${circleVariant[status]} size-4`}></div>
      <p className="text-black">{status}</p>
    </div>
  );
}
