// app/auth/auth-wrapper.tsx
import { redirect } from 'next/navigation';
import { AuthProvider } from './auth-provider';

export async function verifySession() {
  try {
    const { cookies } = await import('next/headers');
    const response = await fetch('http://localhost:8080/auth/get-user', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Cookie: (await cookies()).toString(),
      },
    });

    if (!response.ok) {
      console.log('response not ok: from auth-provider.tsx');
      return null;
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    return null;
  }
}

export async function AuthWrapper({ children }: { children: React.ReactNode }) {
  // Server-side verification function (keep this separate)

  const user = await verifySession();

  if (!user) {
    redirect('/auth/login');
  }

  return <AuthProvider initialUser={user}>{children}</AuthProvider>;
}
