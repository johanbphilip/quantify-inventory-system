import { InventoryItem } from './inventory-item-schema';

export enum Status {
  SUFFICIENT_STOCK = 'Sufficient',
  LOW_STOCK = 'Low',
  CRITICAL_STOCK = 'Critical',
  OUT_OF_STOCK = 'Empty',
}

export type Levels = {
  level: Status;
  items: InventoryItem[];
  count: number;
};

export enum StatusBackgroundColor {
  SUFFICIENT_STOCK = 'bg-green-100',
  LOW_STOCK = 'bg-yellow-100',
  CRITICAL_STOCK = 'bg-red-100',
  OUT_OF_STOCK = 'bg-gray-100',
}
export enum StatusBorderColor {
  SUFFICIENT_STOCK = 'border-green-600',
  LOW_STOCK = 'border-yellow-600',
  CRITICAL_STOCK = 'border-red-600',
  OUT_OF_STOCK = 'border-gray-600',
}
export enum StatusCircleColor {
  SUFFICIENT_STOCK = 'bg-green-600',
  LOW_STOCK = 'bg-yellow-600',
  CRITICAL_STOCK = 'bg-red-600',
  OUT_OF_STOCK = 'bg-gray-600',
}

export enum StatusTextColor {
  SUFFICIENT_STOCK = 'text-green-600',
  LOW_STOCK = 'text-yellow-600',
  CRITICAL_STOCK = 'text-red-600',
  OUT_OF_STOCK = 'text-gray-600',
}
