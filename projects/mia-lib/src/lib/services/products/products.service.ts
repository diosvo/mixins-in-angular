import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '@lib/models/product';
import { BaseService } from '@lib/services/base/base.service';
import { CategoryService } from '@lib/services/category/category.service';
import { LoggerService } from '@lib/services/log/logger.service';
import { BehaviorSubject, combineLatest, Observable, of, ReplaySubject } from 'rxjs';
import { catchError, finalize, map, shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseService<IProduct> {
  private loading$ = new BehaviorSubject<boolean>(true);

  /**
   * @description create an action steam
   */

  // Invalidates the cache and refreshes the data from the backend server
  // The generic parameter is void because it does not care what the value is, only that an item is emitted.

  private refresh = new ReplaySubject<void>(1);

  // Retains the currently selected product Id
  // Uses 0 for no selected product (couldn't use null because it is used as a route parameter)

  private productSelectedAction = new ReplaySubject<number>(1); // number: productId emit to the stream
  productSelectedAction$ = this.productSelectedAction.asObservable();

  /**
   * @description return an observable from the service
   * @api products.json
   * @tips refreshes the data from the backend server
   */

  all$ = this.http.get<Array<IProduct>>('/assets/backend/data/products.json')
    .pipe(
      shareReplay(),
      catchError((_) => of(null)),
      finalize(() => this.loading$.next(false)),
    );

  withCategory$ =
    combineLatest([this.all$, this.categoryService.all$]) // [ Array<IProduct>, Array<ICategory> ]
      .pipe(
        map(([products, categories]) => {
          return products.map(
            product => ({
              ...product,
              categoryName: categories.find(category => product.categoryId === category.categoryId).categoryName
            }) as IProduct);
        }),
        shareReplay()
      );

  selected$ =
    combineLatest([this.productSelectedAction$, this.withCategory$]) // [ IProduct, [ Array<IProduct>, Array<ICategory> ] ]
      .pipe(
        map(([selectedProductId, products]) => {
          return products.find(product => product.productId === selectedProductId);
        }),
        tap(product => this.logger.log('Change selected product: ' + JSON.stringify(product))),
        shareReplay({ bufferSize: 1, refCount: false })
      );

  constructor(
    private readonly http: HttpClient,
    private readonly categoryService: CategoryService,
    private readonly logger: LoggerService,
    protected endpoint: '/assets/backend/data/products.json'
  ) {
    super(endpoint);
    this.loading$.next(true);
  }

  getLoading(): Observable<boolean> {
    return this.loading$;
  }

  /**
   * @description call methods from the service
   * @api products.json
   * @tips uses methods without refreshing
   */

  all(): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(this.endpoint);
  }

  selectedProduct(productId?: number): void {
    this.productSelectedAction.next(productId);
  }

  byId(productId: number): Observable<IProduct> {
    return this.all$.pipe(
      map(products => products.find(row => row.productId === productId)),
    );
  }

  // Refresh the data.

  refreshData(): void {
    this.start();
  }

  start(): void {
    // Start the related services
    this.categoryService.start();
    this.refresh.next();
  }
}
