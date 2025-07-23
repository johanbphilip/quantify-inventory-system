import { z } from 'zod';
import { InventoryItemSchema } from './inventory-item-schema';

export enum TransactionEnum {
  ADD = 'ADD',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export enum TransactionBackgroundColor {
  ADD = 'bg-emerald-300',
  UPDATE = 'bg-slate-300',
  DELETE = 'bg-pink-300',
}
export enum TransactionBorderColor {
  ADD = 'border-emerald-800',
  UPDATE = 'border-slate-800',
  DELETE = 'border-pink-800',
}
export enum TransactionCircleColor {
  ADD = 'bg-emerald-800',
  UPDATE = 'bg-slate-800',
  DELETE = 'bg-pink-800',
}

export enum TransactionTextColor {
  ADD = 'text-emerald-800',
  UPDATE = 'text-slate-800',
  DELETE = 'text-pink-800',
}

const TransactionSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  userId: z.string().uuid(),
  itemName: z.string(),
  itemId: z.string().uuid(),
  newData: z.array(InventoryItemSchema).nullable(),
  actionType: z.enum([
    TransactionEnum.ADD,
    TransactionEnum.DELETE,
    TransactionEnum.UPDATE,
  ]),
});

export type Transaction = z.infer<typeof TransactionSchema>;
