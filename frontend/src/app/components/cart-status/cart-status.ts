import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-cart-status',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart-status.html',
})
export class CartStatus {
  constructor(public cartService: CartService) {}
}
