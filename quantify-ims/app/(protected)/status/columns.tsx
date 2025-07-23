'use client';
import { HeartIcon, MoreHorizontal, ArrowUpDown } from 'lucide-react';

import { ColumnDef } from '@tanstack/react-table';
import { InventoryItem } from '@/lib/types/inventory-item-schema';
import { EditItemSheet } from '@/components/my-components/edit-item-sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/my-components/status-badge';
import { Status } from '@/lib/types/status';
import DeleteAlertDialog from '@/components/my-components/delete-alert-dialog';

export const columns: ColumnDef<InventoryItem>[] = [
  {
    accessorKey: 'itemName',
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
      const item = row.original;
      return (
        <div className="flex items-center gap-2 ml-3">
          <span className="flex gap-2 items-center">
            {item.itemName}
            {item.isFavourite ? (
              <HeartIcon className="size-4 fill-primary stroke-primary" />
            ) : (
              ''
            )}
          </span>
        </div>
      );
    },
  },

  // {
  //   accessorKey: 'status',
  //   header: 'Status',
  //   cell: ({ row }) => {
  //     const status: Status = row.getValue('status');
  //     return (
  //       <div className="flex justify-start items-center gap-2 w-4/5">
  //         <StatusBadge status={status} className="w-full" />
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: 'quantity',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="hover:cursor-pointer"
        >
          Quantity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="text-left ml-3">{row.getValue('quantity')}</div>;
    },
  },
  {
    accessorKey: 'reorderPoint',
    header: 'Reorder Point',
  },
  {
    accessorKey: 'purchasePrice',
    header: 'Purchase Price',
    cell: ({ row }) => {
      const purchasePrice = parseFloat(row.getValue('purchasePrice'));
      const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'CAD',
      }).format(purchasePrice);

      return <div className="text-left font-medium">{formattedPrice}</div>;
    },
  },
  // {
  //   accessorKey: 'storageLocation',
  //   header: 'Storage Location',
  // },
  // {
  //   accessorKey: 'category',
  //   header: 'Category',
  // },
  {
    id: 'actions',
    header: 'Actions',
    enableHiding: false,
    cell: ({ row }) => {
      const item = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(item.itemName)}
              className="flex items-center justify-between"
            >
              Copy Item Name
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <EditItemSheet item={item} itemName={item.itemName}>
                Edit Item
              </EditItemSheet>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <DeleteAlertDialog itemId={item.id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
