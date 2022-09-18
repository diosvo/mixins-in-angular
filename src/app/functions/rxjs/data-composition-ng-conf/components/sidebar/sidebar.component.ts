import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EFunctions, EUrl } from '@home/models/url.enum';
import { AlertComponent } from '@lib/components/alert/alert.component';
import { CustomButtonComponent } from '@lib/components/custom-button/custom-button.component';
import { ProductsService } from '@lib/services/products/products.service';
import { catchError, Subject, throwError } from 'rxjs';

@Component({
  selector: 'data-composition-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,

    AlertComponent,
    CustomButtonComponent,
  ],
  templateUrl: './sidebar.component.html'
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

  onSelected(productId: number): void {
    this.router.navigate([`${EUrl.FUNCTION}/${EFunctions.RXJS}/data-composition-ng-conf`, productId]);
  }
}
