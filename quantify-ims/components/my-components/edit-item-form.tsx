'use client';
import { InventoryItem } from '@/lib/types/inventory-item-schema';
import { useActionState, useEffect, useRef } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import StatusBadge from './status-badge';
import { Status } from '@/lib/types/status';
import { SheetClose, SheetFooter } from '../ui/sheet';
import { Button } from '../ui/button';
import { editItem } from '@/lib/actions/edit-item';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { stat } from 'fs';

export default function EditItemForm({ item }: { item: InventoryItem }) {
  const [state, action, pending] = useActionState(editItem, {
    success: false,
    error: null,
  });
  const sheetCloseRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      toast.success(<h1 className="text-lg font-bold">Item Updated</h1>, {
        description: 'Item updated successfully',
        duration: 4000,
      });
      router.refresh();
      sheetCloseRef.current && sheetCloseRef.current.click();
    }
    if (state?.error) {
      toast.error(<h1 className="text-lg font-bold">Update Failed</h1>, {
        description: state.error || 'An error occurred while updating the item',
        duration: 4000,
      });
      // router.refresh();
      // sheetCloseRef.current && sheetCloseRef.current.click();
    }
  }, [state?.success, state?.error]);

  return (
    <form
      className="flex flex-col justify-between h-full pb-5 px-4"
      action={action}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-2 w-full items-end">
          <div className="flex flex-col items-start gap-2 w-full">
            <Label htmlFor="itemName" className="text-left">
              Name
            </Label>
            <Input
              id="itemName"
              name="itemName"
              defaultValue={item.itemName}
              placeholder="Add a name"
              className="col-span-3"
            />
            {state?.error?.itemName && (
              <p className="text-red-500 text-sm">{state.error.itemName}</p>
            )}
          </div>
          <Input className="sr-only" defaultValue={item.id} id="id" name="id" />
        </div>
        <div className="flex flex-row gap-2">
          <div className="flex flex-col items-start gap-2 w-full">
            <Label htmlFor="name" className="text-left">
              Status
            </Label>
            <StatusBadge status={item.status as Status} />
          </div>
          <div className="flex flex-col items-start gap-2 w-full">
            <Label htmlFor="quantity" className="text-left">
              Quantity
            </Label>
            <Input
              id="quantity"
              name="quantity"
              defaultValue={item.quantity}
              className="col-span-3"
            />
            {state?.error?.quantity && (
              <p className="text-red-500 text-sm">{state.error.quantity}</p>
            )}
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="reorderPoint" className="text-left">
              Reorder Point
            </Label>
            <Input
              id="reorderPoint"
              name="reorderPoint"
              defaultValue={item.reorderPoint}
              className="col-span-3"
            />
            {state?.error?.reorderPoint && (
              <p className="text-red-500 text-sm">{state.error.reorderPoint}</p>
            )}
          </div>
          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="purchasePrice" className="text-left">
              Purchase Price
            </Label>
            <Input
              id="purchasePrice"
              name="purchasePrice"
              defaultValue={item.purchasePrice || ''}
              className="col-span-3"
            />
            {state?.error?.purchasePrice && (
              <p className="text-red-500 text-sm">
                {state.error.purchasePrice}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="storageLocation" className="text-left">
              Storage Location
            </Label>
            <Input
              id="storageLocation"
              name="storageLocation"
              defaultValue={item.storageLocation || ''}
              placeholder="Add a storage location"
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="category" className="text-left">
              Category
            </Label>
            <Input
              id="category"
              name="category"
              defaultValue={item.category || ''}
              placeholder="Add a category"
              className="col-span-3"
            />
            {state?.error?.category && (
              <p className="text-red-500 text-sm">{state.error.category}</p>
            )}
          </div>
        </div>
      </div>
      <Button className="hover:cursor-pointer" type="submit">
        {pending ? 'Saving...' : 'Save Changes'}
      </Button>
      <SheetFooter className="hidden">
        <SheetClose asChild ref={sheetCloseRef}>
          <Button type="button">Save changes</Button>
        </SheetClose>
      </SheetFooter>
    </form>
  );
}
