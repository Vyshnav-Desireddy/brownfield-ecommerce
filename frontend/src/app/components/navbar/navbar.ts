import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartStatus } from '../cart-status/cart-status';
import { LoginStatus } from '../login-status/login-status';
import { Search } from '../search/search';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, Search, CartStatus, LoginStatus],
  templateUrl: './navbar.html',
})
export class Navbar {}
