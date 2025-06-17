import { columns } from './columns';
import { DataTable } from '@/components/my-components/data-table';
import { getAllItems } from '@/lib/actions/get-all-items';
import { InventoryItem } from '@/lib/types/inventory-item-schema';

export default async function page() {
  var items: InventoryItem[] = await getAllItems();
  items = items.filter((item) => item.isFavourite === true);
  return (
    <main className="p-5 flex flex-col gap-5 bg-background">
      <div>
        <h1 className="font-bold text-4xl text-primary">Favourites</h1>
        <p className="text-muted-foreground">Welcome to your Favourite Items</p>
      </div>
      <div className="container  w-full">
        <DataTable columns={columns} data={items} />
      </div>
    </main>
  );
}
