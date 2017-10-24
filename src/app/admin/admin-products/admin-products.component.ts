import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { Subscription } from 'rxjs/Subscription';
import { Product } from '../../models/product';
import { DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount:number = 0;


  constructor(
    private productService: ProductService
  ) {

  }

  ngOnInit() {
    this.subscription = this.productService.getAll()
      .subscribe(products => {
        this.products = products;
        this.initTable(products);
      });
  }

  private initTable(products: Product[]) {
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({offset: 0}).then(items => this.items = items);
    this.tableResource.count().then(count => this.itemCount = count);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  filterProducts(query: string) {
    let filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;

    this.initTable(filteredProducts);
  }

  reloadItems(params) {
    if (!this.tableResource) return;

    this.tableResource.query(params).then(items => this.items = items);
  }
}
