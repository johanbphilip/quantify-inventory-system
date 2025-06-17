import { z } from 'zod';
import { Status } from './status';

export const ItemFormSchema = z.object({
  itemName: z.string().min(1, 'Name is required'),
  quantity: z.number({
    required_error: 'Quantity is required',
    invalid_type_error: 'Must be a number',
  }),
  reorderPoint: z.number({ invalid_type_error: 'Must be a number' }).default(0),
  purchasePrice: z
    .number({ invalid_type_error: 'Must be a number' })
    .nullable()
    .optional(),
  status: z.enum([
    Status.CRITICAL_STOCK,
    Status.LOW_STOCK,
    Status.OUT_OF_STOCK,
    Status.SUFFICIENT_STOCK,
  ]),
  category: z.string().nullable().optional(),
  storageLocation: z.string().nullable().optional(),
  isFavourite: z.boolean().default(false),
});

export type ItemFormType = z.infer<typeof ItemFormSchema>;
