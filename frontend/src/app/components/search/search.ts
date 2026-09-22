import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.html',
})
export class Search {
  constructor(private router: Router) {}

  doSearch(keyword: string): void {
    if (keyword.trim().length > 0) {
      this.router.navigateByUrl(`/search/${keyword}`);
    }
  }
}
