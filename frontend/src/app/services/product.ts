import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

interface GetResponseProductCategories {
  _embedded: {
    productCategory: ProductCategory[];
  };
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private baseUrl = `${environment.apiUrl}/products`;
  private categoryUrl = `${environment.apiUrl}/product-categories`;

  constructor(private httpClient: HttpClient) {}

  getProductList(categoryId: number): Observable<Product[]> {
    const url = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;
    return this.httpClient
      .get<GetResponseProducts>(url)
      .pipe(map((response) => response._embedded.products));
  }

  getProductListPaginate(
    page: number,
    pageSize: number,
    categoryId: number
  ): Observable<GetResponseProducts> {
    const url = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}&page=${page}&size=${pageSize}`;
    return this.httpClient.get<GetResponseProducts>(url);
  }

  getAllProductsPaginate(page: number, pageSize: number): Observable<GetResponseProducts> {
    const url = `${this.baseUrl}?page=${page}&size=${pageSize}`;
    return this.httpClient.get<GetResponseProducts>(url);
  }

  searchProducts(keyword: string): Observable<Product[]> {
    const url = `${this.baseUrl}/search/findByNameContainingIgnoreCase?name=${keyword}`;
    return this.httpClient
      .get<GetResponseProducts>(url)
      .pipe(map((response) => response._embedded.products));
  }

  searchProductsPaginate(
    page: number,
    pageSize: number,
    keyword: string
  ): Observable<GetResponseProducts> {
    const url = `${this.baseUrl}/search/findByNameContainingIgnoreCase?name=${keyword}&page=${page}&size=${pageSize}`;
    return this.httpClient.get<GetResponseProducts>(url);
  }

  getProduct(productId: number): Observable<Product> {
    const url = `${this.baseUrl}/${productId}`;
    return this.httpClient.get<Product>(url);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient
      .get<GetResponseProductCategories>(this.categoryUrl)
      .pipe(map((response) => response._embedded.productCategory));
  }
}
