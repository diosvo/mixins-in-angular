import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IProduct } from '@lib/models/product';
import { ProductsService } from '@lib/services/products/products.service';
import { of } from 'rxjs';
import { ContentComponent } from './content.component';

const product: IProduct = {
  productImage: 'https://picsum.photos/400?image=659',
  productId: 1000,
  productName: 'delightful chocolate Ilise',
  productStock: 81,
  productPrice: 23488.67,
  productSalePrice: 23488.67,
  rating: 1,
  categoryId: 1
};

describe('ContentComponent', () => {
  let component: ContentComponent;
  let fixture: ComponentFixture<ContentComponent>;

  const service = {
    selected$: of(product),
    productSelectedAction: of(product.productId)
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ContentComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [
        {
          provide: ProductsService,
          useValue: service
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should call selected product; display product title if API returns success', (done) => {
    jest.spyOn(component, 'displayProduct');
    component.product$.subscribe((response: IProduct) => {
      expect(component.displayProduct).toBeCalledWith(response);
      done();
    });
  });

  describe('should call displayProduct()', () => {
    test('should show product details when user select any product', () => {
      component.displayProduct(product);
      expect(component.pageTitle).toBe(`Product Details: ${product.productName}`);
    });

    test('should show no product found when there has no product', () => {
      component.displayProduct(undefined);
      expect(component.pageTitle).toBe('No product found');
    });
  });
});
