import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EFunctions, EUrl } from '@home/models/url.enum';
import { SidebarComponent } from './sidebar.component';

const product = {
  productId: 1000,
  productName: 'delightful chocolate Ilise',
  categoryId: 1
};

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('onRefresh()', () => {
    jest.spyOn(component['productsService'], 'refreshData');
    component.onRefresh();
    expect(component['productsService'].refreshData).toBeCalled();
  });

  test('onSelected() to direct to details page', () => {
    jest.spyOn(component['router'], 'navigate');
    component.onSelected(product.productId);
    expect(component['router'].navigate).toBeCalledWith([`${EUrl.FUNCTION}/${EFunctions.RXJS}/data-composition-ng-conf`, product.productId]);
  });
});
