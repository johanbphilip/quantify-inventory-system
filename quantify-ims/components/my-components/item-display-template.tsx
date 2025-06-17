import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { InventoryItem } from '@/lib/types/inventory-item-schema';
import StatusBadge from './status-badge';

export default function ItemDisplayTemplate({ item }: { item: InventoryItem }) {
  return (
    <div className="flex flex-col gap-4 items-start px-5">
      <div className="flex flex-col gap-2 items-start w-full">
        <Label>Quantity</Label>
        <Input disabled={true} defaultValue={item.quantity} />
      </div>
      <div className="flex flex-col gap-2 items-start w-full">
        <Label>Reorder Point</Label>
        <Input disabled={true} defaultValue={item.reorderPoint} />
      </div>
      <div className="flex flex-col gap-2 items-start w-full">
        <Label>Purchase Price</Label>
        <Input disabled={true} defaultValue={item.purchasePrice || ''} />
      </div>
      <div className="flex flex-col gap-2 items-start w-full">
        <Label>Storage Location</Label>
        <Input disabled={true} defaultValue={item.storageLocation || ''} />
      </div>
      <div className="flex flex-col gap-2 items-start w-full">
        <Label>Category</Label>
        <Input disabled={true} defaultValue={item.category || ''} />
      </div>
      <StatusBadge status={item.status} className="w-full" />
    </div>
  );
}
