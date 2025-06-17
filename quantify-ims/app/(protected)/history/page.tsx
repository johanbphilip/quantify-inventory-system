import { DataTable } from '@/components/my-components/data-table';
import { getAllTransactions } from '@/lib/actions/get-all-transactions';
import { Transaction } from '@/lib/types/transactions';
import { columns } from './columns';

export default async function page() {
  const transactions: Transaction[] = await getAllTransactions();
  return (
    <main className="p-5 flex flex-col gap-5 bg-background">
      <div>
        <h1 className="font-bold text-4xl text-primary">History</h1>
        <p className="text-muted-foreground">
          View your transaction history here
        </p>
      </div>
      <div className="container w-full">
        <DataTable columns={columns} data={transactions} />
      </div>
    </main>
  );
}
