'use client';
import { Transaction } from '@/lib/types/transactions';
import PreviousDataSheet from '@/components/my-components/previous-data-sheet';
import { ColumnDef } from '@tanstack/react-table';
import { InventoryItem } from '@/lib/types/inventory-item-schema';

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
    header: 'Transaction Type',
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
