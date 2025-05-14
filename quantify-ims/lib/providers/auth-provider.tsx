// app/auth/auth-provider.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function verifySession() {
  try {
    console.log('inside verifySession');
    const response = await fetch('http://localhost:8080/auth/get-user', {
      // Any protected endpoint will do
      method: 'GET',
      credentials: 'include',
      headers: {
        Cookie: (await cookies()).toString(),
      },
    });

    if (!response.ok) {
      console.log('response not ok');
      return null;
    }

    // The actual endpoint will return user data in your normal API flow
    const data = await response.json();
    console.log('got user data', data);
    return data.user;
  } catch (error) {
    return null;
  }
}

export async function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await verifySession();

  if (!user) {
    redirect('/auth');
  }

  return <>{children}</>;
}
