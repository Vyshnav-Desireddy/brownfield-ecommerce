import { Address } from './address';
import { Customer } from './customer';
import { OrderItem } from './order-item';

export interface Purchase {
  customer: Customer;
  shippingAddress: Address;
  billingAddress: Address;
  order: {
    totalQuantity: number;
    totalPrice: number;
    status: string;
  };
  orderItems: OrderItem[];
}
