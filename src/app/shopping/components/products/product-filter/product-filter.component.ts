import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from '../../../../shared/services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories$;

  @Input('category') category;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.categories$ = this.categoryService.getCategories();
  }

}
