import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomButtonComponent } from '@lib/components/custom-button/custom-button.component';
import { IProduct } from '@lib/models/product';
import { ProductsService } from '@lib/services/products/products.service';
import { combineLatest } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'data-composition-content',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CustomButtonComponent,
  ],
  templateUrl: './content.component.html'
})
export class ContentComponent {
  pageTitle: string;
  hasError = false;

  product$ = this.service.selected$
    .pipe(
      tap({
        next: (product: IProduct) => this.displayProduct(product),
        error: () => this.hasError = true
      })
    );

  selectedProductId$ = this.service.productSelectedAction$;

  combination$ = combineLatest([this.product$, this.selectedProductId$])
    .pipe(
      filter(([product]) => !!product),
      map(([product, selectedProductId]) => ({ product, selectedProductId }))
    );

  constructor(private readonly service: ProductsService) { }

  displayProduct(product: IProduct): void {
    if (product) {
      this.pageTitle = `Product Details: ${product.productName}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }
}
