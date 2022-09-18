import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggerFactory } from '@lib/helpers/logger.factory';
import { IProduct } from '@lib/models/product';
import { combineLatest, Observable, of, ReplaySubject } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private logger = this.loggerFactory.createLogger('ProductsService', 'service');

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
      catchError(() => of(null))
    );

  withCategory$ =
    combineLatest([this.all$, of([])]) // [ Array<IProduct>, Array<ICategory> ]
      .pipe(
        map(([products, categories]) =>
          products.map(
            product => ({
              ...product,
              categoryName: categories.find(category => product.categoryId === category.categoryId).categoryName
            }) as IProduct)
        ),
        shareReplay()
      );

  selected$ =
    combineLatest([this.productSelectedAction$, this.withCategory$]) // [ IProduct, [ Array<IProduct>, Array<ICategory> ] ]
      .pipe(
        map(([selectedProductId, products]) =>
          products.find(product => product.productId === selectedProductId)
        ),
        shareReplay({ bufferSize: 1, refCount: false })
      );

  constructor(
    private readonly http: HttpClient,
    private readonly loggerFactory: LoggerFactory,
  ) { }

  /**
   * @description call methods from the service
   * @api products.json
   * @tips uses methods without refreshing
   */

  all(): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>('/assets/backend/data/products.json');
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
    // this.categoryService.start();
    this.refresh.next();
  }
}
