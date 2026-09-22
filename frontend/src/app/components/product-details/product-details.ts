import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../../common/cart-item';
import { Product } from '../../common/product';
import { CartService } from '../../services/cart';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-details.html',
})
export class ProductDetails implements OnInit {
  product = signal<Product | null>(null);

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      const productId = Number(this.route.snapshot.paramMap.get('id'));
      this.productService.getProduct(productId).subscribe((data) => {
        this.product.set(data);
      });
    });
  }

  addToCart(): void {
    const product = this.product();
    if (product) {
      this.cartService.addToCart(new CartItem(product));
    }
  }
}
