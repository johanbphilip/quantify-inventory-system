'use server'
import { cookies } from 'next/headers';
import { ItemFormSchema, ItemFormType } from '../types/add-item-schema';
import { Status } from '../types/status';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';

export async function addNewItem(
  previousState: ItemFormType,
  formData: FormData,
): Promise<any> {
  const itemName = formData.get('itemName');
  const quantity = Number(formData.get('quantity'));
  const purchasePrice = Number(formData.get('purchasePrice'));
  const reorderPoint = Number(formData.get('reorderPoint'));
  const category = formData.get('category');
  const storageLocation = formData.get('storageLocation');
  const isFavourite = Boolean(formData.get('isFavourite'));
  var status = null;
  if (quantity === 0) {
    status = Status.OUT_OF_STOCK;
  } else if (quantity < reorderPoint && quantity > 0) {
    status = Status.CRITICAL_STOCK;
  } else if (
    quantity > reorderPoint &&
    quantity <= reorderPoint + 10 &&
    quantity > 0
  ) {
    status = Status.LOW_STOCK;
  } else {
    status = Status.SUFFICIENT_STOCK;
  }

  
  const validatedFields = ItemFormSchema.safeParse({
    itemName,
    quantity,
    purchasePrice,
    reorderPoint,
    category,
    storageLocation,
    isFavourite,
    status,
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }
  if (validatedFields.success) {
    try {
      const response = await fetch('http://localhost:8080/api/item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: (await cookies()).toString(),

        },
        body: JSON.stringify({
          itemName,
          quantity,
          purchasePrice,
          reorderPoint,
          category,
          storageLocation,
          isFavourite,
          status,
        }),
        
        cache: 'force-cache',
      });
      if (!response.ok) {
        const errorData = await response.json();
        return { error: errorData.message || 'Login failed' };
      }
      const data = await response.json();
      if (data.error) {
        return {
          success: false,
          error: data.error,
        };
      }
      return { success: true, error: null };
    } catch (error) {
      console.error('Error adding item:', error);
      return {
        success: false,
        error:
        'An error occurred while adding the item. Please try again later.',
      };
    }
    // toast("Item added successfully", {
      // description: "You can now view the item in your dashboard"})
    // redirect('https://localhost:3000/dashboard');
  }
}
