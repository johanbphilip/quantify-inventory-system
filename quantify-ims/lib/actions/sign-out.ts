'use server';

export async function signOut() {
  try {
    const response = await fetch('http://localhost:8080/auth/signout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // This is crucial
      cache: 'no-store', // Avoid caching issues
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || 'Login failed' };
    }

    const data = await response.json();

    return {
      success: true,
      redirect: '/auth/login',
    };
  } catch (error) {
    console.error('Login error:', error);
    return { error: 'An unexpected error occurred' };
  }
}
