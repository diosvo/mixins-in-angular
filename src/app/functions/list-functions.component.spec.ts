import { EUrl } from '@home/models/url.enum';
import { CardItem } from '@home/services/search.service';
import { State } from '@lib/models/server.model';
import { of } from 'rxjs';
import { ListFunctionsComponent } from './list-functions.component';

const state: State<CardItem> = {
  data: [
    {
      name: 'Advanced Caching',
      group_id: 'rxjs',
      routing_path: EUrl.FUNCTION,
      description: '',
      is_maintained: false
    }
  ],
  loading: false,
  error: null
};

describe('ListFunctionsComponent', () => {
  let component: ListFunctionsComponent;

  const mockService: any = {
    getData: jest.fn().mockReturnValue(of(state))
  };

  beforeEach(() => {
    component = new ListFunctionsComponent(mockService);
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
