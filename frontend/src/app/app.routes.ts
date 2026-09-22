import { Routes } from '@angular/router';
import { CartDetails } from './components/cart-details/cart-details';
import { Checkout } from './components/checkout/checkout';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { MembersPage } from './components/members-page/members-page';
import { OrderHistory } from './components/order-history/order-history';
import { ProductDetails } from './components/product-details/product-details';
import { ProductList } from './components/product-list/product-list';
import { authGuard } from './services/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', component: ProductList },
      { path: 'category/:id', component: ProductList },
      { path: 'search/:keyword', component: ProductList },
      { path: 'products/:id', component: ProductDetails },
    ],
  },
  { path: 'cart-details', component: CartDetails },
  { path: 'checkout', component: Checkout },
  { path: 'login', component: Login },
  { path: 'members', component: MembersPage, canActivate: [authGuard] },
  { path: 'order-history', component: OrderHistory, canActivate: [authGuard] },
  { path: '**', redirectTo: 'products' },
];
