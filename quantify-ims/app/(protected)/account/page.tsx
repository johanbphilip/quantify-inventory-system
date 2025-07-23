import { ProfileBlock } from '@/components/my-components/profile-block';

export default function page() {
  return (
    <main className="p-5 flex flex-col gap-5 bg-background w-full">
      <div>
        <h1 className="font-bold text-4xl text-primary">Account</h1>
        <p className="text-muted-foreground">
          Add a new item to your inventory.
        </p>
      </div>
      <ProfileBlock />
    </main>
  );
}
