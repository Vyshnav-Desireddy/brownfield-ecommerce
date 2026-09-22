import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Order } from '../../common/order';
import { OrderHistoryService } from '../../services/order-history';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './order-history.html',
})
export class OrderHistory implements OnInit {
  orders = signal<Order[]>([]);

  constructor(private orderHistoryService: OrderHistoryService) {}

  ngOnInit(): void {
    this.orderHistoryService.getOrderHistory().subscribe((response) => {
      this.orders.set(response.content);
    });
  }
}
