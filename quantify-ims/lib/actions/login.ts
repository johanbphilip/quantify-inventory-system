'use server';

import { LoginFormSchema, LoginFormType } from '../types/login-form';
import { server } from '../axios';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

type LoginFormState = {
  email: '';
  password: '';
};
export async function login(
  previousState: LoginFormState,
  formData: FormData,
): Promise<any> {
  const email = formData.get('email');
  const password = formData.get('password');

  const validatedFields = LoginFormSchema.safeParse({
    email,
    password,
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  if (validatedFields.success) {
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // This is crucial
        cache: 'no-store', // Avoid caching issues
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { error: errorData.message || 'Login failed' };
      }

      const data = await response.json();

      const setCookie = response.headers.getSetCookie();

      const refreshKey = 'refresh_token';
      const refreshCookie = setCookie
        .find((cookie) => cookie.includes(refreshKey))
        ?.split('=')[1]
        .split(';')[0];
      console.log(refreshCookie);
      if (refreshCookie) {
        (await cookies()).set(refreshKey, refreshCookie);
      }
      const accessKey = 'access_token';
      const accessCookie = setCookie
        .find((cookie) => cookie.includes(accessKey))
        ?.split('=')[1]
        .split(';')[0];
      console.log(accessCookie);
      if (accessCookie) {
        (await cookies()).set(accessKey, accessCookie);
      }

      return {
        success: true,
        user: data.user,
        redirect: '/protected/dashboard',
      };
    } catch (error) {
      console.error('Login error:', error);
      return { error: 'An unexpected error occurred' };
    }
  }
}
