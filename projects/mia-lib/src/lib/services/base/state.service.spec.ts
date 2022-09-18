import { User } from '../users/user-service.model';
import { State, StateService } from './state.service';

const user_state: State<User> = {
  data: [
    {
      firstName: 'Dios',
      lastName: 'Vo',
    }
  ],
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
});
