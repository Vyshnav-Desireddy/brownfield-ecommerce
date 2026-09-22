import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AuthResponse {
  token: string;
  email: string;
  firstName: string;
  lastName: string;
}

const TOKEN_KEY = 'luv2shop_token';
const USER_KEY = 'luv2shop_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authUrl = `${environment.apiUrl}/auth`;

  private currentUserSubject = new BehaviorSubject<AuthResponse | null>(this.readStoredUser());
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  register(firstName: string, lastName: string, email: string, password: string): Observable<AuthResponse> {
    return this.httpClient
      .post<AuthResponse>(`${this.authUrl}/register`, { firstName, lastName, email, password })
      .pipe(tap((response) => this.storeSession(response)));
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.httpClient
      .post<AuthResponse>(`${this.authUrl}/login`, { email, password })
      .pipe(tap((response) => this.storeSession(response)));
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private storeSession(response: AuthResponse): void {
    localStorage.setItem(TOKEN_KEY, response.token);
    localStorage.setItem(USER_KEY, JSON.stringify(response));
    this.currentUserSubject.next(response);
  }

  private readStoredUser(): AuthResponse | null {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }
}
