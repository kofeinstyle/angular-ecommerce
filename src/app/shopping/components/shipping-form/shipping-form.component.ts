import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Order } from '../../../shared/models/order';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { OrderService } from '../../../shared/services/order.service';
import { AuthService } from '../../../shared/services/auth.service';
import { ShoppingCart } from '../../../shared/models/shopping-cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;

  userSubscription: Subscription;
  userId: string;

  constructor(private router: Router,
              private orderService: OrderService,
              private authService: AuthService,) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  async placeOrder(shipping) {
    let order = new Order(this.userId, shipping, this.cart);
    let result = await this.orderService.placeOrder(order);

    this.router.navigate(['/order-success', result.key] );

  }
}
