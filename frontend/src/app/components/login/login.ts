import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
})
export class Login {
  mode = signal<'login' | 'register'>('login');
  errorMessage = signal('');

  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  switchMode(mode: 'login' | 'register'): void {
    this.mode.set(mode);
    this.errorMessage.set('');
  }

  submitLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe({
      next: () => this.router.navigateByUrl('/products'),
      error: () => this.errorMessage.set('Invalid email or password.'),
    });
  }

  submitRegister(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    const { firstName, lastName, email, password } = this.registerForm.value;
    this.authService.register(firstName, lastName, email, password).subscribe({
      next: () => this.router.navigateByUrl('/products'),
      error: (err) =>
        this.errorMessage.set(
          err?.error === 'Email already registered' ? 'That email is already registered.' : 'Registration failed.'
        ),
    });
  }
}
