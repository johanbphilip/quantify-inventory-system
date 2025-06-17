import { z } from 'zod';
import { Status } from './status';

export const InventoryItemSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  itemName: z.string(),
  createdAt: z.string().datetime(),
  quantity: z.number(),
  purchasePrice: z.number().nullable().optional(),
  status: z.enum([
    Status.CRITICAL_STOCK,
    Status.LOW_STOCK,
    Status.OUT_OF_STOCK,
    Status.SUFFICIENT_STOCK,
  ]),
  reorderPoint: z.number(),
  category: z.string().nullable().optional(),
  storageLocation: z.string().nullable().optional(),
  isFavourite: z.boolean(),
});
export type InventoryItem = z.infer<typeof InventoryItemSchema>;
