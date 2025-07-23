import { cookies } from 'next/headers';

export async function getAllTransactions() {
  try {
    const response = await fetch('http://localhost:8080/api/transactions/all', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Cookie: (await cookies()).toString(),
      },
    });
    if (!response.ok) {
      return response.status;
    }
    const { data } = await response.json();
    if (data.error) {
      return {
        error: data.error,
      };
    }
    return data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return {
      error:
        'An error occurred while fetching transactions. Please try again later.',
    };
  }
}
