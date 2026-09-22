import { Injectable, computed, signal } from '@angular/core';
import { CartItem } from '../common/cart-item';

@Injectable({ providedIn: 'root' })
export class CartService {
  private itemsSignal = signal<CartItem[]>([]);

  cartItems = this.itemsSignal.asReadonly();

  totalPrice = computed(() =>
    this.itemsSignal().reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
  );

  totalQuantity = computed(() =>
    this.itemsSignal().reduce((sum, item) => sum + item.quantity, 0)
  );

  addToCart(cartItem: CartItem): void {
    this.itemsSignal.update((items) => {
      const existingItem = items.find((item) => item.id === cartItem.id);
      if (existingItem) {
        return items.map((item) =>
          item.id === cartItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...items, cartItem];
    });
  }

  incrementQuantity(cartItem: CartItem): void {
    this.itemsSignal.update((items) =>
      items.map((item) => (item.id === cartItem.id ? { ...item, quantity: item.quantity + 1 } : item))
    );
  }

  decrementQuantity(cartItem: CartItem): void {
    this.itemsSignal.update((items) =>
      items
        .map((item) => (item.id === cartItem.id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    );
  }

  remove(cartItem: CartItem): void {
    this.itemsSignal.update((items) => items.filter((item) => item.id !== cartItem.id));
  }

  clearCart(): void {
    this.itemsSignal.set([]);
  }
}
