import React from 'react';
import { InventoryItem } from '@/lib/types/inventory-item-schema';
import { FavouritesCarousel } from './favourites-carousel';
import { StatusCarousel } from './status-carousel';

export default function DashboardTile({ items }: { items: InventoryItem[] }) {
  return (
    <div className="grid grid-cols-2 h-1/2 gap-5 justify-between w-full">
      <StatusCarousel items={items} />
      <FavouritesCarousel items={items} />
    </div>
  );
}
