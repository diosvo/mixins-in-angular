import { IBaseValue } from '@home/models/search.model';
import { CardItemComponent } from './card-item.component';

const item: IBaseValue = {
  name: 'RxJS',
  route: 'data-composition-ng-conf',
  description: ''
};

describe('CardItemComponent', () => {
  let component: CardItemComponent;

  const mockRouter: any = {
    navigate: jest.fn()
  };

  beforeEach(() => {
    component = new CardItemComponent(mockRouter);
    component.data = [];
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('directItem()', () => {
    component.directItem('functions', 'rxjs', item.route);
    expect(mockRouter.navigate).toBeCalledWith(['functions', 'rxjs', item.route]);
  });
});
