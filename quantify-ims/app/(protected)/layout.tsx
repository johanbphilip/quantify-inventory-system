import { AppSidebar } from '@/components/my-components/app-sidebar';
import { SiteHeader } from '@/components/my-components/site-header';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/lib/providers/auth-provider';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <AuthProvider>
        {children}
        <Toaster richColors />
      </AuthProvider>
    </SidebarProvider>
  );
}
