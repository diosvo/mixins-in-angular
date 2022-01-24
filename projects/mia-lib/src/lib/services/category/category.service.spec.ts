import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ICategory } from '@lib/models/category';
import { CategoryService } from './category.service';

const category: ICategory = {
  'categoryId': 1,
  'categoryName': 'Animal'
};

const list_categories = [category];

describe('CategoryService', () => {
  let service: CategoryService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    });

    service = TestBed.inject(CategoryService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('all$ runs when staring the refresh', () => {
    service['refresh'].next();
    service.all$.subscribe({
      next: (response: Array<ICategory>) => {
        expect(response).toEqual(list_categories);
        expect(response.length).toEqual(1);
      },
      error: ({ message }) => fail(message)
    });

    const request = http.expectOne('/assets/backend/data/category.json');
    expect(request.request.method).toBe('GET');
    request.flush(list_categories);
  });

  test('all()', () => {
    service.all().subscribe({
      next: (response: Array<ICategory>) => {
        expect(response).toEqual(list_categories);
        expect(response.length).toEqual(1);
      },
      error: ({ message }) => fail(message)
    });

    const request = http.expectOne('/assets/backend/data/category.json');
    expect(request.request.method).toBe('GET');
    request.flush(list_categories);
  });

  test('refreshData()', () => {
    jest.spyOn(service['refresh'], 'next');
    service.refreshData();
    expect(service['refresh'].next).toBeCalled();
  });

  test('start()', () => {
    jest.spyOn(service, 'refreshData');
    service.refreshData();
    expect(service.refreshData).toBeCalled();
  });
});
