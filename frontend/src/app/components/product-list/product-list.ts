import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, computed, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartItem } from '../../common/cart-item';
import { Product } from '../../common/product';
import { CartService } from '../../services/cart';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product-list.html',
})
export class ProductList implements OnInit {
  products = signal<Product[]>([]);
  currentCategoryId = 0;
  previousCategoryId = 0;
  searchMode = false;

  pageNumber = signal(0);
  pageSize = signal(10);
  totalElements = signal(0);

  totalPages = computed(() => Math.ceil(this.totalElements() / this.pageSize()) || 1);
  pageNumbers = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i));

  previousKeyword = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts(): void {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts(): void {
    const keyword = this.route.snapshot.paramMap.get('keyword')!;

    if (this.previousKeyword !== keyword) {
      this.pageNumber.set(0);
    }
    this.previousKeyword = keyword;

    this.productService
      .searchProductsPaginate(this.pageNumber(), this.pageSize(), keyword)
      .subscribe((response) => {
        this.products.set(response._embedded.products);
        this.pageNumber.set(response.page.number);
        this.pageSize.set(response.page.size);
        this.totalElements.set(response.page.totalElements);
      });
  }

  handleListProducts(): void {
    const hasCategoryId = this.route.snapshot.paramMap.has('id');

    this.currentCategoryId = hasCategoryId ? Number(this.route.snapshot.paramMap.get('id')) : 0;

    if (this.previousCategoryId !== this.currentCategoryId) {
      this.pageNumber.set(0);
    }
    this.previousCategoryId = this.currentCategoryId;

    const source$ = hasCategoryId
      ? this.productService.getProductListPaginate(this.pageNumber(), this.pageSize(), this.currentCategoryId)
      : this.productService.getAllProductsPaginate(this.pageNumber(), this.pageSize());

    source$.subscribe((response) => {
      this.products.set(response._embedded.products);
      this.pageNumber.set(response.page.number);
      this.pageSize.set(response.page.size);
      this.totalElements.set(response.page.totalElements);
    });
  }

  updatePageSize(pageSize: string): void {
    this.pageSize.set(Number(pageSize));
    this.pageNumber.set(0);
    this.listProducts();
  }

  goToPage(page: number): void {
    if (page < 0 || page >= this.totalPages()) {
      return;
    }
    this.pageNumber.set(page);
    this.listProducts();
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(new CartItem(product));
  }
}
