// import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function getAllItems() {
  try {
    const response = await fetch('http://localhost:8080/api/item/all', {
      method: 'GET',
      credentials: 'include',
      cache: 'no-store',
      headers: {
        Cookie: (await cookies()).toString(),
      },
    });
    if (!response.ok) {
      console.log(response);
      return response.status;
    }

    const { data } = await response.json();

    if (data.error) {
      return {
        error: data.error,
      };
    }
    // revalidatePath('/dashboard');
    return data;
  } catch (error) {
    console.error('Error fetching items:', error);
    return {
      error: 'An error occurred while fetching items. Please try again later.',
    };
  }
}
