import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Order } from '../common/order';

interface GetResponseOrders {
  content: Order[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

@Injectable({ providedIn: 'root' })
export class OrderHistoryService {
  private ordersUrl = `${environment.apiUrl}/orders`;

  constructor(private httpClient: HttpClient) {}

  getOrderHistory(): Observable<GetResponseOrders> {
    return this.httpClient.get<GetResponseOrders>(this.ordersUrl);
  }
}
