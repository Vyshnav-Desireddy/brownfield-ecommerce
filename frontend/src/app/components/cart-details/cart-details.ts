import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-cart-details',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart-details.html',
})
export class CartDetails {
  constructor(public cartService: CartService) {}

  increment(item: CartItem): void {
    this.cartService.incrementQuantity(item);
  }

  decrement(item: CartItem): void {
    this.cartService.decrementQuantity(item);
  }

  remove(item: CartItem): void {
    this.cartService.remove(item);
  }
}
