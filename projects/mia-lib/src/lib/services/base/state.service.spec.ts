import { State } from '@lib/models/server.model';
import { MOCK_LIST_USERS, MOCK_USER } from '../../mocks/json-placeholder/user.mock';
import { User } from '../json-placeholder/users/user-service.model';
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
    function run(filter_by, inject, expected) {
      it(`should filter data by ${filter_by}`, () => {
        expect(service.filteredData(inject.data, inject.params, inject.keys)).toEqual(expected);
      });
    };

    run('query string with provided keys',
      {
        data: MOCK_LIST_USERS,
        params: { query: 'dios' },
        keys: ['name']
      },
      [MOCK_USER]
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
        params: { email: 'vtmn1212@gmail.com', query: 'dios' },
        keys: ['name', 'id']
      },
      [MOCK_USER]
    );
  });
});
