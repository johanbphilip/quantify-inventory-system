'use client';
import { ChevronDown } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import { DataTable, DataTableProps } from './data-table';
import { useState } from 'react';
import {
  Status,
  StatusBackgroundColor,
  StatusBorderColor,
  StatusTextColor,
} from '@/lib/types/status';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { InventoryItem } from '@/lib/types/inventory-item-schema';
import { Separator } from '../ui/separator';
import { cn } from '@/lib/utils';

export default function StatusDropdown({
  data,
  columns,
}: DataTableProps<any, any>) {
  const criticalStockItems = data.filter(
    (item) => item.status === Status.CRITICAL_STOCK,
  );
  const lowStockItems = data.filter((item) => item.status === Status.LOW_STOCK);
  const outOfStockItems = data.filter(
    (item) => item.status === Status.OUT_OF_STOCK,
  );
  const sufficientStockItems = data.filter(
    (item) => item.status === Status.SUFFICIENT_STOCK,
  );

  return (
    <div className="flex flex-col gap-4">
      <Accordion type="single" defaultValue={Status.OUT_OF_STOCK}>
        <AccordionItem value={Status.OUT_OF_STOCK}>
          <AccordionTrigger
            className={cn(StatusTextColor.OUT_OF_STOCK, 'text-lg')}
          >
            Out Of Stock Items
          </AccordionTrigger>

          <AccordionContent className="flex flex-col gap-2">
            {outOfStockItems.map((item: InventoryItem) => (
              <Card
                className={cn('flex flex-row', StatusBorderColor.OUT_OF_STOCK)}
                key={item.id}
              >
                <CardHeader className="w-full">
                  <CardTitle>
                    {item.itemName} {item.isFavourite}
                  </CardTitle>
                  <CardDescription>{item.id}</CardDescription>
                </CardHeader>
                <Separator orientation="vertical" className="fill-primary" />
                <CardContent className="flex flex-col gap-2 w-1/2">
                  <div className="flex flex-row gap-2">
                    <p className="w-full text-right">Quantity</p>
                    <Separator orientation="vertical" />
                    <p>{item.quantity}</p>
                  </div>
                  <div className="flex flex-row gap-2">
                    <p className="w-full text-right">Reorder Point</p>
                    <Separator orientation="vertical" />
                    <p>{item.reorderPoint}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value={Status.CRITICAL_STOCK}>
          <AccordionTrigger
            className={cn(StatusTextColor.CRITICAL_STOCK, 'text-lg')}
          >
            Critical Stock Items
          </AccordionTrigger>

          <AccordionContent className="flex flex-col gap-2">
            {criticalStockItems.map((item: InventoryItem) => (
              <Card
                className={cn(
                  'flex flex-row',
                  StatusBorderColor.CRITICAL_STOCK,
                )}
                key={item.id}
              >
                <CardHeader className="w-full">
                  <CardTitle>
                    {item.itemName} {item.isFavourite}
                  </CardTitle>
                  <CardDescription>{item.id}</CardDescription>
                </CardHeader>
                <Separator orientation="vertical" className="fill-primary" />
                <CardContent className="flex flex-col gap-2 w-1/2">
                  <div className="flex flex-row gap-2">
                    <p className="w-full text-right">Quantity</p>
                    <Separator orientation="vertical" />
                    <p>{item.quantity}</p>
                  </div>
                  <div className="flex flex-row gap-2">
                    <p className="w-full text-right">Reorder Point</p>
                    <Separator orientation="vertical" />
                    <p>{item.reorderPoint}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value={Status.LOW_STOCK}>
          <AccordionTrigger
            className={cn(StatusTextColor.LOW_STOCK, 'text-lg')}
          >
            Low Stock Items
          </AccordionTrigger>

          <AccordionContent className="flex flex-col gap-2">
            {lowStockItems.map((item: InventoryItem) => (
              <Card
                className={cn('flex flex-row', StatusBorderColor.LOW_STOCK)}
                key={item.id}
              >
                <CardHeader className="w-full">
                  <CardTitle>
                    {item.itemName} {item.isFavourite}
                  </CardTitle>
                  <CardDescription>{item.id}</CardDescription>
                </CardHeader>
                <Separator orientation="vertical" className="fill-primary" />
                <CardContent className="flex flex-col gap-2 w-1/2">
                  <div className="flex flex-row gap-2">
                    <p className="w-full text-right">Quantity</p>
                    <Separator orientation="vertical" />
                    <p>{item.quantity}</p>
                  </div>
                  <div className="flex flex-row gap-2">
                    <p className="w-full text-right">Reorder Point</p>
                    <Separator orientation="vertical" />
                    <p>{item.reorderPoint}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value={Status.SUFFICIENT_STOCK}>
          <AccordionTrigger
            className={cn(StatusTextColor.SUFFICIENT_STOCK, 'text-lg')}
          >
            Sufficient Stock Items
          </AccordionTrigger>

          <AccordionContent className="flex flex-col gap-2">
            {sufficientStockItems.map((item: InventoryItem) => (
              <Card
                className={cn(
                  'flex flex-row',
                  StatusBorderColor.SUFFICIENT_STOCK,
                )}
                key={item.id}
              >
                <CardHeader className="w-full">
                  <CardTitle>
                    {item.itemName} {item.isFavourite}
                  </CardTitle>
                  <CardDescription>{item.id}</CardDescription>
                </CardHeader>
                <Separator orientation="vertical" className="fill-primary" />
                <CardContent className="flex flex-col gap-2 w-1/2">
                  <div className="flex flex-row gap-2">
                    <p className="w-full text-right">Quantity</p>
                    <Separator orientation="vertical" />
                    <p>{item.quantity}</p>
                  </div>
                  <div className="flex flex-row gap-2">
                    <p className="w-full text-right">Reorder Point</p>
                    <Separator orientation="vertical" />
                    <p>{item.reorderPoint}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

function CategoryDropdownItem({ data, columns }: DataTableProps<any, any>) {
  const [isActive, setIsActive] = useState(false);

  return (
    <Collapsible>
      <div className="flex flex-row gap-2">
        <CollapsibleTrigger>
          <ChevronDown
            className={` ${
              isActive ? 'rotate-180 transform' : ''
            }  transition-transform duration-300 ease-in-out hover:cursor-pointer`}
            onClick={() => setIsActive(!isActive)}
          />
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <DataTable columns={columns} data={data} />
      </CollapsibleContent>
    </Collapsible>
  );
}
