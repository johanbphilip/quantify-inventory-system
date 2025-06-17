import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { InventoryItem } from '@/lib/types/inventory-item-schema';
import ItemDisplayTemplate from './item-display-template';
import { HeartIcon } from 'lucide-react';

export default function PreviousDataSheet({
  className,
  item,
}: {
  className?: string;
  item: InventoryItem;
}) {
  return (
    <Sheet>
      <SheetTrigger
        asChild
        className="font-normal text-left justify-start rounded-sm px-2 py-0"
      >
        <Button
          variant={'link'}
          size={'sm'}
          className={cn(
            'text-left w-full text-text hover:cursor-pointer',
            className,
          )}
        >
          View Previous Data
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-xl flex gap-2 items-center">
            {item.itemName}{' '}
            {item.isFavourite ? (
              <HeartIcon
                className="size-4 fill-primary stroke-primary"
                type="button"
              />
            ) : (
              ''
            )}
          </SheetTitle>
          <SheetDescription>
            View the details of this transaction here.
          </SheetDescription>
        </SheetHeader>
        <ItemDisplayTemplate item={item} />
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="default" className="w-full">
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
