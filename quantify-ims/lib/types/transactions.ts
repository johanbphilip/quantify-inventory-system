import { z } from 'zod';
import { InventoryItemSchema } from './inventory-item-schema';

export enum TransactionType {
  ADD = 'Add Item',
  REMOVE = 'Remove Item',
  UPDATE = 'Update Item',
}

const TransactionSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  userId: z.string().uuid(),
  itemName: z.string(),
  itemId: z.string().uuid(),
  newData: z.array(InventoryItemSchema).nullable(),
  actionType: z.enum([
    TransactionType.ADD,
    TransactionType.REMOVE,
    TransactionType.UPDATE,
  ]),
});

export type Transaction = z.infer<typeof TransactionSchema>;
