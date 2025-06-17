import { columns } from './columns';
import { DataTable } from '@/components/my-components/data-table';
import { getAllItems } from '@/lib/actions/get-all-items';
import DashboardTile from '@/components/my-components/dashboard-tile';

export default async function page() {
  const items = await getAllItems();
  return (
    <main className="p-5 flex flex-col gap-5 bg-background">
      <div>
        <h1 className="font-bold text-4xl text-primary">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your Quantify Dashboard
        </p>
      </div>
      <DashboardTile items={items} />
      <div className="container  w-full">
        <DataTable columns={columns} data={items} />
      </div>
    </main>
  );
}
