// lib/auth.ts
import { cookies } from 'next/headers';

export async function getSession() {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get('access_token')?.value;

  if (!accessToken) return { user: null };

  try {
    const response = await fetch('http://localhost:8080/auth/user', {
      headers: {
        Cookie: `access_token=${accessToken}`,
      },
    });

    if (!response.ok) return { user: null };

    const data = await response.json();
    return data;
  } catch (error) {
    return { user: null };
  }
}

export async function getUser() {
  const session = await getSession();
  return session?.user || null;
}
