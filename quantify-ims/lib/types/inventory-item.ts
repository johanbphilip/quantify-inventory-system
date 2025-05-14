import { UUID } from 'crypto';
import { z } from 'zod';

const InventoryItemSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  itemName: z.string(),
  createdAt: z.string().datetime(),
  quantity: z.number(),
  purchasePrice: z.number().nullable().optional(),
  status: z.boolean().nullable(),
  reorderPoint: z.number(),
  category: z.string().nullable().optional(),
  storageLocation: z.string().nullable().optional(),
  isFavourite: z.boolean(),
});
export type InventoryItem = z.infer<typeof InventoryItemSchema>;

export const dummyItems: InventoryItem[] = [
  {
    id: 'aad44c44-837e-4112-bb0f-25c90353bcbb',
    userId: '00064c09-f159-48df-aeae-1d5a383f5b63',
    itemName: 'Test It',
    createdAt: '2025-01-30T21:09:08.07549+00:00',
    quantity: 4,
    purchasePrice: 40,
    status: null,
    reorderPoint: 10,
    category: null,
    storageLocation: null,
    isFavourite: false,
  },
  {
    id: 'e840f854-c0c8-47ac-827c-5beaa7701e48',
    userId: '00064c09-f159-48df-aeae-1d5a383f5b63',
    itemName: 'Test Item 3',
    createdAt: '2025-02-05T19:08:40.829779+00:00',
    quantity: 10,
    purchasePrice: 100,
    status: null,
    reorderPoint: 9,
    category: null,
    storageLocation: null,
    isFavourite: false,
  },
];
