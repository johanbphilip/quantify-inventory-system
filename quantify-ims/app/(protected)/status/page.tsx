import StatusDropdown from '@/components/my-components/status-dropdown';
import { getAllItems } from '@/lib/actions/get-all-items';
import { columns } from './columns';

export default async function page() {
  const items = await getAllItems();

  return (
    <main className="p-5 flex flex-col gap-5 bg-background w-full">
      <div>
        <h1 className="font-bold text-4xl text-primary">Status Groups</h1>
        <p className="text-muted-foreground">
          View your items in their statuses.
        </p>
      </div>
      <StatusDropdown data={items} columns={columns} />
    </main>
  );
}
