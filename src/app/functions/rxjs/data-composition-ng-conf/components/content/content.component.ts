import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IProduct } from '@lib/models/product';
import { ProductsService } from '@lib/services/products/products.service';
import { combineLatest } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'data-composition-content',
  templateUrl: './content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
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
      this.pageTitle = `Product Details ➡ ${product.productName}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }
}
