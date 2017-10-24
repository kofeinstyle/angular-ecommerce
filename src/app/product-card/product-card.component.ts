import { Component, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input('show-actions') showActions = true;
  @Input('product') product;
  @Input('shopping-cart') shoppingCart;

  constructor(private cartService: ShoppingCartService) { }


  addToCard() {

    this.cartService.addToCart(this.product);
  }

  removeFromCard() {
    this.cartService.removeFromCard(this.product);
  }

  getQuantity() {
    if (!this.shoppingCart) return 0;
    let item = this.shoppingCart.itemsMap[this.product.key];

    return item ? item.quantity : 0;
  }
}
