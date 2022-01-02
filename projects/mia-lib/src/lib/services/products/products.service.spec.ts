import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IProduct } from '@lib/models/product';
import { of } from 'rxjs';
import { CategoryService } from '../category/category.service';
import { ProductsService } from './products.service';

const product: IProduct = {
  productId: 1000,
  productName: 'delightful chocolate Ilise',
  productImage: 'https://picsum.photos/400?image=659',
  productStock: 81,
  productPrice: 23488.67,
  productSalePrice: 23488.67,
  rating: 4,
  categoryId: 1
};

const list_products = [product];

describe('ProductsService', () => {
  let service: ProductsService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [CategoryService]
    });

    service = TestBed.inject(ProductsService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('selected$', () => {
    service.productSelectedAction$ = of(product.productId);
    service.withCategory$ = of(list_products);

    service.selected$.subscribe({
      next: (response: IProduct) => expect(response).toEqual(product),
      error: ({ message }) => fail(message)
    });

    const request = http.expectOne('/assets/backend/data/products.json');
    expect(request.request.method).toBe('GET');
    request.flush(product);
  });

  test('all()', () => {
    service.all().subscribe({
      next: (response: Array<IProduct>) => {
        expect(response).toEqual(list_products);
        expect(response.length).toEqual(1);
      },
      error: ({ message }) => fail(message)
    });

    const request = http.expectOne('/assets/backend/data/products.json');
    expect(request.request.method).toBe('GET');
    request.flush(list_products);
  });

  test('byId()', () => {
    service.all$ = of(list_products);

    service.byId(product.productId).subscribe({
      next: (response: IProduct) => expect(response).toEqual(product),
      error: ({ message }) => fail(message)
    });
  });

  test('refreshData()', () => {
    jest.spyOn(service, 'start');
    service.refreshData();
    expect(service.start).toBeCalled();
  });

  test('start()', () => {
    jest.spyOn(service['categoryService'], 'start');
    jest.spyOn(service['refresh'], 'next');

    service.refreshData();

    expect(service['categoryService'].start).toBeCalled();
    expect(service['refresh'].next).toBeCalled();
  });
});
