import { Component, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProductCategory } from '../../common/product-category';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-product-category-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './product-category-menu.html',
})
export class ProductCategoryMenu implements OnInit {
  productCategories = signal<ProductCategory[]>([]);

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProductCategories().subscribe((data) => {
      this.productCategories.set(data);
    });
  }
}
