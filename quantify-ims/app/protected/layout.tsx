import { AppSidebar } from '@/components/my-components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AuthProvider } from '@/lib/providers/auth-provider';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <AuthProvider>{children}</AuthProvider>
    </SidebarProvider>
  );
}
