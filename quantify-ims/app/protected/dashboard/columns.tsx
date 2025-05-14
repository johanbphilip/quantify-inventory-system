'use client';
import { Copy, CopyIcon, Edit, EditIcon, MoreHorizontal } from 'lucide-react';

import { ColumnDef } from '@tanstack/react-table';
import { InventoryItem, dummyItems } from '@/lib/types/inventory-item';
import { EditItemSheet } from '@/components/my-components/edit-item-sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { CustomTooltip } from '@/components/my-components/custom-tooltip';

export const columns: ColumnDef<InventoryItem>[] = [
  {
    accessorKey: 'itemName',
    header: 'Item',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
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
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    id: 'editItem',
    cell: ({ row }) => {
      const item = row.original;
      return <EditItemSheet itemName={item.itemName} />;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="flex justify-center gap-2 ">
          <CustomTooltip description="Copy Item Name">
            <Button
              onClick={() => navigator.clipboard.writeText(item.itemName)}
              variant={'ghost'}
            >
              <CopyIcon />
            </Button>
          </CustomTooltip>
          <EditItemSheet itemName={item.itemName}>
            <EditIcon className="stroke-primary" />
          </EditItemSheet>
        </div>
      );
    },
  },
];
