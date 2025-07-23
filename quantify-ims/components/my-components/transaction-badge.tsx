import {
  TransactionBackgroundColor,
  TransactionBorderColor,
  TransactionCircleColor,
  TransactionTextColor,
  TransactionEnum,
} from '@/lib/types/transactions';
import { cn } from '@/lib/utils';

export default function TransactionBadge({
  transactionType,
  className,
}: {
  transactionType: TransactionEnum;
  className?: string;
}) {
  const backgroundVariant = {
    [TransactionEnum.ADD]: TransactionBackgroundColor.ADD,
    [TransactionEnum.UPDATE]: TransactionBackgroundColor.UPDATE,
    [TransactionEnum.DELETE]: TransactionBackgroundColor.DELETE,
  };
  const borderVariant = {
    [TransactionEnum.ADD]: TransactionBorderColor.ADD,
    [TransactionEnum.UPDATE]: TransactionBorderColor.UPDATE,
    [TransactionEnum.DELETE]: TransactionBorderColor.DELETE,
  };
  const circleVariant = {
    [TransactionEnum.ADD]: TransactionCircleColor.ADD,
    [TransactionEnum.UPDATE]: TransactionCircleColor.UPDATE,
    [TransactionEnum.DELETE]: TransactionCircleColor.DELETE,
  };
  const textVariant = {
    [TransactionEnum.ADD]: TransactionTextColor.ADD,
    [TransactionEnum.UPDATE]: TransactionTextColor.UPDATE,
    [TransactionEnum.DELETE]: TransactionTextColor.DELETE,
  };
  return (
    <div
      className={cn(
        `rounded-md px-3 py-1  border flex gap-2 items-center text-sm h-9'`,
        className,
        textVariant[transactionType],
        backgroundVariant[transactionType],
        borderVariant[transactionType],
      )}
    >
      <div
        className={cn('rounded-full size-4', circleVariant[transactionType])}
      ></div>
      <p>{transactionType}</p>
    </div>
  );
}
