import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login-status',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './login-status.html',
})
export class LoginStatus {
  constructor(public authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/products');
  }
}
