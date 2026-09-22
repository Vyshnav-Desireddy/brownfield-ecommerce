import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Country } from '../common/country';
import { Purchase } from '../common/purchase';
import { State } from '../common/state';

interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  };
}

interface GetResponseStates {
  _embedded: {
    states: State[];
  };
}

@Injectable({ providedIn: 'root' })
export class CheckoutService {
  private purchaseUrl = `${environment.apiUrl}/checkout/purchase`;
  private countriesUrl = `${environment.apiUrl}/countries`;
  private statesUrl = `${environment.apiUrl}/states/search/findByCountryCode`;

  constructor(private httpClient: HttpClient) {}

  placeOrder(purchase: Purchase): Observable<any> {
    return this.httpClient.post<any>(this.purchaseUrl, purchase);
  }

  getCountries(): Observable<Country[]> {
    return this.httpClient
      .get<GetResponseCountries>(this.countriesUrl)
      .pipe(map((response) => response._embedded.countries));
  }

  getStates(countryCode: string): Observable<State[]> {
    const url = `${this.statesUrl}?code=${countryCode}`;
    return this.httpClient
      .get<GetResponseStates>(url)
      .pipe(map((response) => response._embedded.states));
  }
}
