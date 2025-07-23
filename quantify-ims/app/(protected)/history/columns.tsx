'use client';
import { Transaction, TransactionEnum } from '@/lib/types/transactions';
import PreviousDataSheet from '@/components/my-components/previous-data-sheet';
import { ColumnDef } from '@tanstack/react-table';
import { InventoryItem } from '@/lib/types/inventory-item-schema';
import TransactionBadge from '@/components/my-components/transaction-badge';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'itemName',
    header: 'Item',
  },
  {
    accessorKey: 'createdAt',
    header: 'Transaction Date',
    cell: ({ row }) => {
      const date: Date = row.getValue('createdAt');
      return new Date(date).toLocaleTimeString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    },
  },
  {
    accessorKey: 'actionType',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="hover:cursor-pointer"
        >
          Item Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const transactionType: TransactionEnum = row.getValue('actionType');
      console.log(transactionType);
      return (
        <div className="flex justify-start items-center gap-2 w-4/5">
          <TransactionBadge
            transactionType={transactionType}
            className="w-full"
          />
        </div>
      );
    },
  },
  {
    accessorKey: 'newData',
    header: 'Old Data',
    //TODO: need to update this to be old data rather than new data
    cell: ({ row }) => {
      const newData: InventoryItem | null = row.getValue('newData');
      return newData ? <PreviousDataSheet item={newData} /> : null;
    },
  },
];
