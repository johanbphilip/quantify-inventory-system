import AddItemForm from '@/components/my-components/add-item-form';

export default function page() {
  return (
    <main className="p-5 flex flex-col gap-5 bg-background w-full">
      <div>
        <h1 className="font-bold text-4xl text-primary">Create New Item</h1>
        <p className="text-muted-foreground">
          Add a new item to your inventory.
        </p>
      </div>
      <AddItemForm />
    </main>
  );
}
