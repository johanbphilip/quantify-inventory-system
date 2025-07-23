'use server';

import { cookies } from 'next/headers';
import { SignUpFormSchema } from '../types/sign-up-form';

type SignUpFormState = {
  firstName: '';
  lastName: '';
  email: '';
  password: '';
  organization: '';
};
export async function signUp(
  previousState: SignUpFormState,
  formData: FormData,
): Promise<any> {
  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');
  const organization = formData.get('organization');
  const email = formData.get('email');
  const password = formData.get('password');

  const validatedFields = SignUpFormSchema.safeParse({
    firstName,
    lastName,
    organization,
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
      const response = await fetch('http://localhost:8080/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          organization,
          email,
          password,
        }),
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
      if (refreshCookie) {
        (await cookies()).set(refreshKey, refreshCookie);
      }
      const accessKey = 'access_token';
      const accessCookie = setCookie
        .find((cookie) => cookie.includes(accessKey))
        ?.split('=')[1]
        .split(';')[0];
      if (accessCookie) {
        (await cookies()).set(accessKey, accessCookie);
      }

      return {
        success: true,
        user: data.user,
        redirect: '/dashboard',
      };
    } catch (error) {
      console.error('Login error:', error);
      return { error: 'An unexpected error occurred' };
    }
  }
}
