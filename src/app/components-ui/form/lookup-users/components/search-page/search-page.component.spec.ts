import { State } from '@lib/models/server.model';
import { User } from '@lib/services/json-placeholder/users/user-service.model';
import { MOCK_LIST_USERS } from 'projects/mia-lib/src/lib/mocks/json-placeholder/user.mock';
import { of } from 'rxjs';
import { SearchPageComponent } from './search-page.component';

describe('SearchPageComponent', () => {
  let component: SearchPageComponent;

  const user_state: State<User> = {
    data: MOCK_LIST_USERS,
    loading: false
  };

  const mockService: any = {
    loadState: jest.fn(),
    users_state$: of(user_state),
  };

  beforeEach(() => {
    component = new SearchPageComponent(mockService);
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('ngOnInit() to set up component after page load', (done) => {
    component.ngOnInit();
    component.state$.subscribe((state: State<User>) => {
      expect(state).toEqual(user_state);
      done();
    });
    expect(mockService.loadState).toBeCalled();
  });

  test('stateChanges()', () => {
    jest.spyOn(component.selected$, 'next');
    component.stateChanges('diosvo');
    expect(component.selected$.next).toBeCalledWith('diosvo');
  });
});
