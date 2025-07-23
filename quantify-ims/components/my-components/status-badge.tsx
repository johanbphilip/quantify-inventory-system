import {
  Status,
  StatusBackgroundColor,
  StatusBorderColor,
  StatusCircleColor,
  StatusTextColor,
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
  const textVariant = {
    [Status.SUFFICIENT_STOCK]: StatusTextColor.SUFFICIENT_STOCK,
    [Status.LOW_STOCK]: StatusTextColor.LOW_STOCK,
    [Status.CRITICAL_STOCK]: StatusTextColor.CRITICAL_STOCK,
    [Status.OUT_OF_STOCK]: StatusTextColor.OUT_OF_STOCK,
  };
  return (
    <div
      className={cn(
        `rounded-md px-3 py-1  border flex gap-2 items-center text-sm h-9'`,
        className,
        textVariant[status],
        backgroundVariant[status],
        borderVariant[status],
      )}
    >
      <div className={cn('rounded-full size-4', circleVariant[status])}></div>
      <p>{status}</p>
    </div>
  );
}
