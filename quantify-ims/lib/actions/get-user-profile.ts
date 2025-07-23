// import { revalidatePath } from 'next/cache';

export async function getUserProfile() {
  try {
    const response = await fetch(
      'http://localhost:8080/profile/get-user-profile',
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          // Cookie: (await cookies()).toString(),
        },
      },
    );
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
