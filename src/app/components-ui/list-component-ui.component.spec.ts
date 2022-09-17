import { EUrl } from '@home/models/url.enum';
import { CardItem } from '@home/services/search.service';
import { State } from '@lib/models/server.model';
import { of } from 'rxjs';
import { ListComponentUiComponent } from './list-component-ui.component';

const state: State<CardItem> = {
  data: [
    {
      name: 'Custom Button',
      group_id: 'button',
      routing_path: EUrl.COMPONENT,
      description: '',
      is_maintained: false
    }
  ],
  loading: false,
  error: null
};

describe('ListComponentUiComponent', () => {
  let component: ListComponentUiComponent;

  const mockService: any = {
    getData: jest.fn().mockReturnValue(of(state))
  };

  beforeEach(() => {
    component = new ListComponentUiComponent(mockService);
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    test('should get the current state', (done) => {
      component.ngOnInit();
      component.state$.subscribe((response: State<CardItem>) => {
        expect(response).toEqual(state);
        done();
      });
    });
  });

  describe('clearAllIconActive()', () => {
    test('should hide clear all icon if group is all and query is empty value', () => {
      component.form.setValue({
        group: [],
        query: ''
      });
      expect(component.clearAllIconActive()).toBe(false);
    });

    test('should show clear all icon if query has value and group is not all selected', () => {
      component.form.setValue({
        group: [],
        query: 'test'
      });
      expect(component.clearAllIconActive()).toBe(true);
    });
  });
});
