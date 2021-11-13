import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EFunctions, EUrl } from '@home/models/url.enum';
import { ProductsService } from '@lib/services/products/products.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'data-composition-sidebar',
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {
  errorMessage: string;

  products$ = this.productsService
    .all$
    .pipe(
      tap({
        error: () => this.errorMessage = 'An error occurred. Please try again.!'
      })
    );

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly productsService: ProductsService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.productsService.selectedProduct(id);
    });
  }

  onRefresh(): void {
    this.productsService.refreshData();
  }

  async onSelected(productId: number): Promise<void> {
    await this.router.navigate([`${EUrl.FUNCTION}/${EFunctions.RXJS}/data-composition-ng-conf`, productId]);
  }
}
