'use client';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Label } from '../ui/label';
import { useActionState, useEffect } from 'react';
import { addNewItem } from '@/lib/actions/add-new-item';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function AddItemForm() {
  const [state, action, pending] = useActionState(addNewItem, undefined);

  const router = useRouter();
  useEffect(() => {
    if (state?.success) {
      console.log('success toast triggered');
      toast.success(<h1 className="text-lg font-bold">Item Created</h1>, {
        description: 'Item created successfully',
        duration: 4000,
      });
      router.push('/dashboard');
    }
    if (state?.error) {
      console.log('error toast triggered');
      toast.error(<h1 className="text-lg font-bold">Error Occured</h1>, {
        description: 'Item could not be created. Please try again',
        duration: 4000,
      });
    }
  }, [state?.success, state?.error]);

  return (
    <Card>
      <CardContent>
        <form className="flex flex-col gap-4" action={action}>
          <div className="flex flex-row gap-2">
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="itemName">Item Name *</Label>
              <input
                type="text"
                placeholder="Item Name"
                id="itemName"
                name="itemName"
                className="border rounded-md p-2"
              />
              {state?.error?.itemName ? (
                <p className="text-red-500 text-sm">{state.error.itemName}</p>
              ) : (
                <p className="text-muted-foreground text-sm">
                  The name of your item
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="quantity">Quantity *</Label>
              <input
                placeholder="40"
                id="quantity"
                name="quantity"
                className="border rounded-md p-2"
              />
              {state?.error?.quantity ? (
                <p className="text-red-500 text-sm">{state.error.quantity}</p>
              ) : (
                <p className="text-muted-foreground text-sm">
                  Your current stock; Must be greater than 0
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="reorderPoint">Reorder Point</Label>
              <input
                placeholder="10"
                id="reorderPoint"
                name="reorderPoint"
                className="border rounded-md p-2"
              />
              {state?.error?.reorderPoint ? (
                <p className="text-red-500 text-sm">
                  {state.error.reorderPoint}
                </p>
              ) : (
                <p className="text-muted-foreground text-sm">
                  The point at which you want to be notified to reorder; Default
                  is 0
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="purchasePrice">Purchase Price</Label>
              <input
                placeholder="40"
                id="purchasePrice"
                name="purchasePrice"
                className="border rounded-md p-2"
              />
              {state?.error?.purchasePrice ? (
                <p className="text-red-500 text-sm">
                  {state.error.purchasePrice}
                </p>
              ) : (
                <p className="text-muted-foreground text-sm">
                  The purchasing price of the item
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-row gap-2">
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="storageLocation">Storage Location</Label>
              <input
                type="text"
                placeholder="Warehouse 1"
                id="storageLocation"
                name="storageLocation"
                className="border rounded-md p-2"
              />
              {state?.error?.storageLocation ? (
                <p className="text-red-500 text-sm">
                  {state.error.storageLocation}
                </p>
              ) : (
                <p className="text-muted-foreground text-sm">
                  Location the item is stored
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="category">Category</Label>
              <input
                type="text"
                placeholder="Cleaning Supplies"
                id="category"
                name="category"
                className="border rounded-md p-2"
              />
              {state?.error?.category ? (
                <p className="text-red-500 text-sm">{state.error.category}</p>
              ) : (
                <p className="text-muted-foreground text-sm">
                  Category of the item; e.g. Electronics, Furniture, etc.
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full items-start">
              <Label htmlFor="isFavourite">Favourite</Label>
              <input
                type="checkbox"
                placeholder="40"
                id="isFavourite"
                name="isFavourite"
                className="border rounded-md h-10"
              />
              {state?.error?.isFavourite ? (
                <p className="text-red-500 text-sm">
                  {state.error.isFavourite}
                </p>
              ) : (
                <p className="text-muted-foreground text-sm">
                  Mark as favourite for enhanced visibility
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="bg-primary rounded-md p-2 text-white font-semibold"
          >
            Add Item
          </button>
          <button
            onClick={() =>
              toast.success(
                <h1 className="text-lg font-bold">Item Created</h1>,
                {
                  description: 'Item created successfully',
                  // duration: 2000,
                },
              )
            }
          >
            Test this button
          </button>
        </form>

        <CardFooter></CardFooter>
      </CardContent>
    </Card>
  );
}
