import { Button } from '@/components/ui/button';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { InventoryItem } from '@/lib/types/inventory-item-schema';
import EditItemForm from './edit-item-form';
import { cn } from '@/lib/utils';

export function EditItemSheet({
  itemName,
  children,
  item,
  className,
}: {
  itemName: string;
  children?: React.ReactNode;
  item: InventoryItem;
  className?: string;
}) {
  console.log(itemName);
  return (
    <Sheet>
      <SheetTrigger
        asChild
        className="font-normal text-left justify-start rounded-sm px-2 py-0"
      >
        <Button
          variant={'ghost'}
          size={'sm'}
          className={cn('text-left w-full', className)}
        >
          {children}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Item</SheetTitle>
          <SheetDescription>
            Make changes to your item here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <EditItemForm item={item} />
      </SheetContent>
    </Sheet>
  );
}
