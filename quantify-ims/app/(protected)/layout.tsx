import { AppSidebar } from '@/components/my-components/app-sidebar';
import { SiteHeader } from '@/components/my-components/site-header';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/lib/providers/auth-provider';
import { AuthWrapper } from '@/lib/providers/auth-wrapper';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AuthWrapper>
        <AppSidebar />
        {children}
        <Toaster richColors />
      </AuthWrapper>
    </SidebarProvider>
  );
}
