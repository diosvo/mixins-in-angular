import { Params } from '@angular/router';
import { User } from '@lib/models/json-placeholder/user.model';
import { State } from '@lib/models/server.model';
import { MOCK_LIST_USERS, MOCK_USER } from '../../mocks/json-placeholder/user.mock';
import { StateService } from './state.service';

const user_state: State<User> = {
  data: MOCK_LIST_USERS,
  loading: false
};

describe('StateService', () => {
  let service: StateService<State<User>>;

  beforeEach(() => {
    service = new StateService<State<User>>(user_state);
  });

  test('should initialize service', () => {
    expect(service).toBeTruthy();
  });

  test('should get the current state', () => {
    expect(service['state']).toEqual(user_state);
  });

  test('should select state by key', (done) => {
    service['select']((state) => state.loading).subscribe((response: boolean) => {
      expect(response).toBe(false);
      done();
    });
  });

  test('should set new state', () => {
    jest.spyOn(service['state$'], 'next');
    service['setState']({ loading: true });
    expect(service['state$'].next).toBeCalledWith({
      ...user_state,
      loading: true
    });
  });

  describe('filteredData()', () => {
    function run(filter_by: string, inject: Params, expected): void {
      it(`should filter data by ${filter_by}`, () => {
        expect(service.filteredData(inject.data, inject.params, inject.keys)).toEqual(expected);
      });
    };

    run('query string with provided keys',
      {
        data: MOCK_LIST_USERS,
        params: { query: MOCK_USER.name },
        keys: ['name']
      },
      MOCK_LIST_USERS
    );

    run('item key',
      {
        data: MOCK_LIST_USERS,
        params: { id: '3' },
        keys: ['name']
      },
      []
    );

    run('item key and query string',
      {
        data: MOCK_LIST_USERS,
        params: { email: MOCK_USER.email, query: MOCK_USER.name },
        keys: ['name', 'id']
      },
      MOCK_LIST_USERS
    );
  });
});
