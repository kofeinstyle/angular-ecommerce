import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  update(productId, product) {
    return this.db.object('/products/' + productId)
      .update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove()
  }

  getAll() {
    return this.db.list('/products')
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => {
          return { key: c.payload.key, ...c.payload.val()};
        });
      });
  }

  getOne(productId) {
    return this.db.object('/products/' + productId).valueChanges();
  }

}
