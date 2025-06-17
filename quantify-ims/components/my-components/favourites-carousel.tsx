'use client';
import { useState } from 'react';

import { ArrowLeft, ArrowRight, ArrowUpRight, HeartIcon } from 'lucide-react';
import { InventoryItem } from '@/lib/types/inventory-item-schema';
import StatusBadge from './status-badge';
import Link from 'next/link';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

export const FavouritesCarousel = ({ items }: { items: InventoryItem[] }) => {
  const favouriteItems: InventoryItem[] = items.filter(
    (item) => item.isFavourite,
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleNextItem = () => {
    setCurrentIndex((prev) => (prev + 1) % favouriteItems.length);
    1;
  };
  const handlePreviousItem = () => {
    if (currentIndex === 0) {
      setCurrentIndex(favouriteItems.length - 1);
      return;
    }
    setCurrentIndex((prev) => (prev - 1) % favouriteItems.length);
  };

  if (!favouriteItems || favouriteItems.length === 0) {
    return <div>No favourites available.</div>;
  }
  return (
    <Card className="flex flex-col items-center justify-between gap-2 bg-card rounded-md border">
      <CardHeader className="flex w-full items-start justify-between ">
        <div className="flex flex-col gap-1 items-start">
          <CardDescription className="">Favourites</CardDescription>
          <CardTitle className="font-semi-bold text-xl">
            {favouriteItems[currentIndex].itemName}
          </CardTitle>
        </div>
        <div className="flex items-center gap-2">
          <HeartIcon className="fill-primary stroke-primary size-7" />
          <Link href={'/favourites'} type="button">
            <ArrowUpRight className="hover:stroke-primary size-7 border rounded-full" />
          </Link>
        </div>
      </CardHeader>
      <CardContent className="flex w-full items-end gap-2">
        <div className="flex flex-col items-start justify-center">
          {/* <CardDescription className="text-muted-foreground  ">
            Quantity
          </CardDescription> */}
          <h2 className="font-medium text-7xl ">
            {favouriteItems[currentIndex].quantity}
          </h2>
        </div>
        <div className="flex h-full flex-col justify-center">
          <p className="font-normal">
            <span className="text-muted-foreground text-sm">Category: </span>
            {favouriteItems[currentIndex].category}
          </p>
          <p className="font-normal">
            <span className="text-muted-foreground text-sm">
              Storage Location:{' '}
            </span>
            {favouriteItems[currentIndex].storageLocation}
          </p>
          <p className="font-normal">
            <span className="text-muted-foreground text-sm">
              Purchase Price:{' '}
            </span>
            {`$${favouriteItems[currentIndex].purchasePrice?.toFixed(2)}`}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex w-full items-center justify-between gap-10">
        <StatusBadge
          status={favouriteItems[currentIndex].status}
          className="w-full"
        />
        <div className="flex gap-2">
          <Button
            className=" hover:bg-primary bg-background text-foreground border hover:text-background rounded-full hover:cursor-pointer size-7"
            onClick={() => handlePreviousItem()}
            size={'icon'}
          >
            <ArrowLeft className="size-5 " />
          </Button>
          <Button
            className="hover:bg-primary bg-background text-foreground border hover:text-background rounded-full hover:cursor-pointer size-7"
            onClick={() => handleNextItem()}
            size={'icon'}
          >
            <ArrowRight className=" size- " />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
