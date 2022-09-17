import { EUrl } from '@home/models/url.enum';
import { CardItem } from '@home/services/search.service';
import { CardItemComponent } from './card-item.component';

const item: CardItem = {
  name: 'Advanced Caching',
  group_id: 'rxjs',
  routing_path: EUrl.FUNCTION,
  description: ''
};

describe('CardItemComponent', () => {
  let component: CardItemComponent;

  const mockRouter: any = {
    navigate: jest.fn()
  };

  const mockRoute: any = {};

  beforeEach(() => {
    component = new CardItemComponent(mockRouter, mockRoute);
    component.data = [];
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('directItem()', () => {
    component.directItem(item.group_id, item.routing_path);
    expect(mockRouter.navigate).toBeCalledWith([item.group_id, item.routing_path], {
      relativeTo: component['route']
    });
  });
});
