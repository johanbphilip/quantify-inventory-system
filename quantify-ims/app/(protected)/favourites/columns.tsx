'use client';
import { Copy, CopyIcon, Edit, EditIcon, MoreHorizontal } from 'lucide-react';

import { ColumnDef } from '@tanstack/react-table';
import { InventoryItem } from '@/lib/types/inventory-item-schema';
import { EditItemSheet } from '@/components/my-components/edit-item-sheet';

import { Button } from '@/components/ui/button';
import { CustomTooltip } from '@/components/my-components/custom-tooltip';
import StatusBadge from '@/components/my-components/status-badge';
import { Status } from '@/lib/types/status';

export const columns: ColumnDef<InventoryItem>[] = [
  {
    accessorKey: 'itemName',
    header: 'Item',
  },
  {
    accessorKey: 'isFavourite',
    header: 'Favourite',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status: Status = row.getValue('status');
      return (
        <div className="flex justify-start items-center gap-2 w-4/5">
          <StatusBadge status={status} />
        </div>
      );
    },
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
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="flex justify-start items-center gap-2 ">
          <CustomTooltip description="Copy Item Name">
            <Button
              onClick={() => navigator.clipboard.writeText(item.itemName)}
              variant={'ghost'}
            >
              <CopyIcon />
            </Button>
          </CustomTooltip>

          <EditItemSheet itemName={item.itemName} item={item}>
            <EditIcon className="stroke-primary" />
          </EditItemSheet>
        </div>
      );
    },
  },
];
