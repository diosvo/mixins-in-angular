import { State } from '@lib/models/server.model';
import { MOCK_LIST_USERS } from '../../mocks/json-placeholder/user.mock';
import { User } from '../json-placeholder/users/user-service.model';
import { StateService } from './state.service';

const user_state: State<User> = {
  data: MOCK_LIST_USERS,
  loading: false
};

describe('StateService', () => {
  let service: StateService<User>;

  beforeEach(() => {
    service = new StateService<User>(user_state);
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
});
