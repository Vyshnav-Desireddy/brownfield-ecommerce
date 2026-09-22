import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from '../../common/country';
import { OrderItem } from '../../common/order-item';
import { Purchase } from '../../common/purchase';
import { State } from '../../common/state';
import { AuthService } from '../../services/auth';
import { CartService } from '../../services/cart';
import { CheckoutService } from '../../services/checkout';
import { Luv2ShopValidators } from '../../validators/luv2shop-validators';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './checkout.html',
})
export class Checkout implements OnInit {
  checkoutFormGroup!: FormGroup;

  countries = signal<Country[]>([]);
  shippingAddressStates = signal<State[]>([]);
  billingAddressStates = signal<State[]>([]);

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  orderTrackingNumber = signal<string | null>(null);
  submitError = signal('');
  formSubmitted = signal(false);

  constructor(
    private fb: FormBuilder,
    public cartService: CartService,
    private checkoutService: CheckoutService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.isLoggedIn()
      ? JSON.parse(localStorage.getItem('luv2shop_user') || 'null')
      : null;

    this.checkoutFormGroup = this.fb.group({
      customer: this.fb.group({
        firstName: ['', [Validators.required, Luv2ShopValidators.notOnlyWhitespace]],
        lastName: ['', [Validators.required, Luv2ShopValidators.notOnlyWhitespace]],
        email: [currentUser?.email ?? '', [Validators.required, Validators.email]],
      }),
      shippingAddress: this.fb.group({
        street: ['', [Validators.required, Luv2ShopValidators.notOnlyWhitespace]],
        city: ['', [Validators.required, Luv2ShopValidators.notOnlyWhitespace]],
        state: ['', [Validators.required]],
        country: ['', [Validators.required]],
        zipCode: ['', [Validators.required, Luv2ShopValidators.notOnlyWhitespace]],
      }),
      billingAddress: this.fb.group({
        street: ['', [Validators.required, Luv2ShopValidators.notOnlyWhitespace]],
        city: ['', [Validators.required, Luv2ShopValidators.notOnlyWhitespace]],
        state: ['', [Validators.required]],
        country: ['', [Validators.required]],
        zipCode: ['', [Validators.required, Luv2ShopValidators.notOnlyWhitespace]],
      }),
      creditCard: this.fb.group(
        {
          cardType: ['visa', [Validators.required]],
          nameOnCard: ['', [Validators.required, Luv2ShopValidators.notOnlyWhitespace]],
          cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
          securityCode: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
          expirationMonth: ['', [Validators.required]],
          expirationYear: ['', [Validators.required]],
        },
        { validators: [Luv2ShopValidators.cardExpirationValid] }
      ),
    });

    this.creditCardMonths = Array.from({ length: 12 }, (_, i) => i + 1);
    const startYear = new Date().getFullYear();
    this.creditCardYears = Array.from({ length: 10 }, (_, i) => startYear + i);

    this.checkoutService.getCountries().subscribe((data) => this.countries.set(data));
  }

  get customer() {
    return this.checkoutFormGroup.get('customer')!;
  }

  get shippingAddress() {
    return this.checkoutFormGroup.get('shippingAddress')!;
  }

  get billingAddress() {
    return this.checkoutFormGroup.get('billingAddress')!;
  }

  get creditCard() {
    return this.checkoutFormGroup.get('creditCard')!;
  }

  isInvalid(path: string): boolean {
    const control = this.checkoutFormGroup.get(path);
    if (!control) {
      return false;
    }
    return control.invalid && (control.touched || this.formSubmitted());
  }

  copyShippingToBilling(checked: boolean): void {
    if (checked) {
      this.billingAddress.patchValue(this.shippingAddress.value);
      this.billingAddressStates.set(this.shippingAddressStates());
    } else {
      this.billingAddress.reset();
    }
  }

  onCountryChange(formGroupName: 'shippingAddress' | 'billingAddress', countryCode: string): void {
    if (!countryCode) {
      return;
    }
    this.checkoutService.getStates(countryCode).subscribe((data) => {
      if (formGroupName === 'shippingAddress') {
        this.shippingAddressStates.set(data);
      } else {
        this.billingAddressStates.set(data);
      }
      this.checkoutFormGroup.get(`${formGroupName}.state`)?.setValue('');
    });
  }

  onSubmit(): void {
    this.formSubmitted.set(true);

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      this.submitError.set('Please fix the highlighted fields below before placing your order.');
      return;
    }

    this.submitError.set('');

    const orderItems = this.cartService.cartItems().map((item) => new OrderItem(item));

    const purchase: Purchase = {
      customer: this.customer.value,
      shippingAddress: this.shippingAddress.value,
      billingAddress: this.billingAddress.value,
      order: {
        totalQuantity: this.cartService.totalQuantity(),
        totalPrice: this.cartService.totalPrice(),
        status: 'pending',
      },
      orderItems,
    };

    this.checkoutService.placeOrder(purchase).subscribe({
      next: (response) => {
        this.orderTrackingNumber.set(response.orderTrackingNumber);
        this.cartService.clearCart();
        this.checkoutFormGroup.reset();
      },
      error: () => {
        this.submitError.set('There was an error placing your order. Please try again.');
      },
    });
  }
}
