import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EFunctions, EUrl } from '@home/models/url.enum';
import { ProductsService } from '@lib/services/products/products.service';
import { catchError, Subject, throwError } from 'rxjs';

@Component({
  selector: 'data-composition-sidebar',
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {
  errorMessage$ = new Subject<string>();

  products$ = this.productsService.all$.pipe(
    catchError(({ message }) => {
      this.errorMessage$.next(message);
      return throwError(() => new Error(message));
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
