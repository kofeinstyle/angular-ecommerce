import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from './models/product';
import 'rxjs/add/operator/take';
import { number } from 'ng2-validation/dist/number';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from './models/shopping-cart';
import 'rxjs/add/operator/map';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges()
      .map(x => new ShoppingCart(x['items']));
  }

  private async getOrCreateCartId() : Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId)  return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  removeFromCard(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let items$ = this.getItem(cartId, product.key);
    items$.valueChanges().take(1).subscribe(item => {
      let quantity = item === null ? 0 : item['quantity'];
      if (quantity === 0 && item) {
        items$.remove();
        //items$.update({product: product, quantity: quantity + change });
      } else {
        items$.update({product: product, quantity: quantity + change });
      }
    });
  }
}
