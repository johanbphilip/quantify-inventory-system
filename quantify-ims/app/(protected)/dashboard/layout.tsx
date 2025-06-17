import { SiteHeader } from '@/components/my-components/site-header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full">
      <SiteHeader />
      {children}
    </main>
  );
}
