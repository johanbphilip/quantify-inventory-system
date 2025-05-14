import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { columns } from './columns';
import { dummyItems } from '@/lib/types/inventory-item';
import { DataTable } from '@/components/my-components/data-table';
import { getAllItems } from '@/lib/actions/get-all-items';
import { EditItemSheet } from '@/components/my-components/edit-item-sheet';

export default async function page() {
  const data = await getAllItems();
  return (
    <main className="p-5 flex flex-col gap-5 bg-background">
      <div>
        <h1 className="font-bold text-4xl text-primary">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your Quantify Dashboard
        </p>
      </div>
      <div className="grid grid-cols-4 gap-5">
        <Card className="hover:shadow-lg duration-200 ease-in-out">
          <CardHeader>
            <CardTitle>Low Stock</CardTitle>
            <CardTitle className="text-5xl text-destructive">14 </CardTitle>
          </CardHeader>
          <CardFooter>
            <CardDescription>
              14 items are in low stock and approaching reorder point
            </CardDescription>
          </CardFooter>
        </Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </div>
      {/* <EditItemSheet item} /> */}
      <div className="container py-10 w-full">
        <DataTable columns={columns} data={data} />
      </div>
    </main>
  );
}
