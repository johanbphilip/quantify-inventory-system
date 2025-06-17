// components/protected-route.tsx
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function ProtectedRoute({
  children,
  redirectPath = '/auth/login',
}: {
  children: React.ReactNode;
  redirectPath?: string;
}) {
  const { user } = await getSession();

  // if (!user) {
  //   redirect(redirectPath);
  // }

  return <>{children}</>;
}
