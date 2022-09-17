import { EUrl } from '@home/models/url.enum';
import { CardItem } from '@home/services/search.service';
import { mockSnackbar } from '@lib/services/snackbar/snackbar.service.spec';
import { CardItemComponent } from './card-item.component';

const item: CardItem = {
  name: 'Advanced Caching',
  group_id: 'rxjs',
  routing_path: EUrl.FUNCTION,
  description: '',
  is_maintained: false
};

describe('CardItemComponent', () => {
  let component: CardItemComponent;

  const mockRouter: any = {
    navigate: jest.fn()
  };

  const mockRoute: any = {};

  beforeEach(() => {
    component = new CardItemComponent(mockRouter, mockRoute, mockSnackbar);
    component.data = [];
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('directItem()', () => {
    test('should allow user to access page', () => {
      component.directItem(item);
      expect(mockRouter.navigate).toBeCalledWith([item.group_id, item.routing_path], {
        relativeTo: component['route']
      });
    });

    test('should prevent user to access page when is_maintained is true', () => {
      component.directItem({
        ...item,
        is_maintained: true
      });
      expect(mockSnackbar.error).toBeCalledWith('The site is currently down for maintenance');
    });
  });
});
