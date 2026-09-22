import { Address } from './address';
import { OrderItem } from './order-item';

export interface Order {
  id?: number;
  orderTrackingNumber?: string;
  totalQuantity: number;
  totalPrice: number;
  status?: string;
  dateCreated?: string;
  billingAddress?: Address;
  shippingAddress?: Address;
  orderItems?: OrderItem[];
}
