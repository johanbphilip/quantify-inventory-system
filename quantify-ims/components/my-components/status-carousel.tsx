'use client';
import { useState } from 'react';

import { ArrowLeft, ArrowRight, ArrowUpRight, HeartIcon } from 'lucide-react';
import { InventoryItem } from '@/lib/types/inventory-item-schema';
import StatusBadge from './status-badge';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Levels, Status } from '@/lib/types/status';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

export const StatusCarousel = ({ items }: { items: InventoryItem[] }) => {
  const sufficientStock: InventoryItem[] = items.filter(
    (item) => item.status === Status.SUFFICIENT_STOCK,
  );
  const lowStock: InventoryItem[] = items.filter(
    (item) => item.status === Status.LOW_STOCK,
  );
  const criticalStock: InventoryItem[] = items.filter(
    (item) => item.status === Status.CRITICAL_STOCK,
  );
  const emptyStock: InventoryItem[] = items.filter(
    (item) => item.status === Status.OUT_OF_STOCK,
  );

  const levels: Levels[] = [
    {
      level: Status.SUFFICIENT_STOCK,
      items: sufficientStock,
      count: sufficientStock.length,
    },
    {
      level: Status.LOW_STOCK,
      items: lowStock,
      count: lowStock.length,
    },
    {
      level: Status.CRITICAL_STOCK,
      items: criticalStock,
      count: criticalStock.length,
    },
    {
      level: Status.OUT_OF_STOCK,
      items: emptyStock,
      count: emptyStock.length,
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleNextItem = () => {
    setCurrentIndex((prev) => (prev + 1) % levels.length);
    1;
  };
  const handlePreviousItem = () => {
    if (currentIndex === 0) {
      setCurrentIndex(levels.length - 1);
      return;
    }
    setCurrentIndex((prev) => (prev - 1) % levels.length);
  };

  if (!levels || levels.length === 0) {
    return <div>No favourites available.</div>;
  }
  return (
    <Card className="flex flex-col items-center justify-between gap-2 bg-card rounded-md border">
      <CardHeader className="flex w-full items-start justify-between ">
        <div className="flex flex-col gap-1 items-start">
          <CardDescription>Status Levels</CardDescription>
          <CardTitle className="font-semi-bold text-xl">
            {levels[currentIndex].level + ' Stock Items'}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex w-full items-end justify-between gap-2">
        <div className="flex items-center gap-2">
          {levels && (
            <div className="flex items-end justify-center gap-2">
              <h2 className="text-7xl font-medium">
                {levels[currentIndex].count}
              </h2>
              <p className="font-normal text-muted-foreground">items</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex w-full items-center justify-between gap-10">
        <StatusBadge status={levels[currentIndex].level} className="w-full" />
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
