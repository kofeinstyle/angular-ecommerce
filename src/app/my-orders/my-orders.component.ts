import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import 'rxjs/add/operator/switchMap';

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
