import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../shared/services/order.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orders$;

  constructor(private ordersService: OrderService,
              private authService: AuthService) {

    this.orders$ = authService.user$.switchMap( user => {
      return ordersService.getOrdersByUser(user.uid);
    } );

  }

  ngOnInit() {

  }

}
