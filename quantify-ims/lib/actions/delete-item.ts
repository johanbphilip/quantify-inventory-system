'use server'

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function deleteItem(itemId: string) {
  console.log('printing itemId from delete-item.ts', itemId);
  try {
    const response = await fetch(`http://localhost:8080/api/item/${itemId}`, {
      method: 'DELETE',
      headers: {
                'Content-Type': 'application/json',
                Cookie: (await cookies()).toString(),
      
              },
      credentials: 'include',
      cache: 'no-store',
    });
    if (!response.ok) {
      console.log('Error deleting item:', response);
      return {
        error:
          'An error occurred while deleting the item. Please try again later.',
      };
    }
    const { data } = await response.json();
    if (data.error) {
      return {
        success: false,
        error: data.error,
      };
    }
    // revalidatePath('/dashboard');

    return { success: true, data: data };
  } catch (error) {
    console.error('Error deleting item:', error);
    return {
      error:
        'An error occurred while deleting the item. Please try again later.',
    };
  }
  revalidatePath ('/dashboard');
}
