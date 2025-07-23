// // app/auth/auth-provider.tsx
// import { cookies } from 'next/headers';
// import { redirect } from 'next/navigation';

// export async function verifySession() {
//   try {
//     const response = await fetch('http://localhost:8080/auth/get-user', {
//       // Any protected endpoint will do
//       method: 'GET',
//       credentials: 'include',
//       headers: {
//         Cookie: (await cookies()).toString(),
//       },
//     });

//     if (!response.ok) {
//       console.log('response not ok: from auth-provider.tsx');
//       return null;
//     }

//     // The actual endpoint will return user data in your normal API flow
//     const data = await response.json();
//     return data.user;
//   } catch (error) {
//     return null;
//   }
// }

// export async function AuthProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const user = await verifySession();

//   if (!user) {
//     redirect('/auth/login');
//   }

//   return <>{children}</>;
// }

// app/auth/auth-provider.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '../types/user';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  // logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Client-side verification function
async function verifySessionClient() {
  try {
    const response = await fetch('http://localhost:8080/auth/get-user', {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    return null;
  }
}

export function AuthProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: User | null;
}) {
  const [user, setUser] = useState<User | null>(initialUser);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // const logout = async () => {
  //   try {
  //     await fetch('http://localhost:8080/auth/logout', {
  //       method: 'POST',
  //       credentials: 'include',
  //     });
  //     setUser(null);
  //     router.push('/auth/login');
  //   } catch (error) {
  //     console.error('Logout error:', error);
  //   }
  // };

  const refreshUser = async () => {
    setLoading(true);
    const userData = await verifySessionClient();
    setUser(userData);
    setLoading(false);

    if (!userData) {
      router.push('/auth/login');
    }
  };

  const value = {
    user,
    loading,
    // logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
