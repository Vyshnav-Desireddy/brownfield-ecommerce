import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductCategoryMenu } from '../product-category-menu/product-category-menu';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, ProductCategoryMenu],
  templateUrl: './home.html',
})
export class Home {}
