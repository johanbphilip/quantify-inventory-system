import { cookies } from 'next/headers';
import { server } from '../axios';
import { InventoryItem } from '../types/inventory-item';

export async function getAllItems() {
  try {
    const response = await fetch('http://localhost:8080/api/item/all', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Cookie: (await cookies()).toString(),
      },
    });
    if (!response.ok) {
      console.log(response);
      return response.status;
    }

    const { data } = await response.json();
    console.log(data);

    if (data.error) {
      return {
        error: data.error,
      };
    }
    return data;
  } catch (error) {
    console.error('Error fetching items:', error);
    return {
      error: 'An error occurred while fetching items. Please try again later.',
    };
  }
}
