import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IBaseValue } from '@home/models/search.model';
import { CardItemComponent } from './card-item.component';

const item: IBaseValue = {
  name: 'RxJS',
  route: 'data-composition-ng-conf',
  description: ''
};

describe('CardItemComponent', () => {
  let component: CardItemComponent;
  let fixture: ComponentFixture<CardItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CardItemComponent],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'functions/rxjs/' + item.route,
            component: CardItemComponent
          }
        ])
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('directItem()', () => {
    jest.spyOn(component['router'], 'navigate');
    component.directItem('functions', 'rxjs', item.route);
    expect(component['router'].navigate).toBeCalledWith(['functions', 'rxjs', item.route]);
  });

  test('trackByItemName()', () => {
    expect(component.trackByItemName(null, item)).toBe(item.name);
  });
});
