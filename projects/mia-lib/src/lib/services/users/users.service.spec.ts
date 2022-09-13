import { State } from '@lib/models/server.model';
import { of, throwError } from 'rxjs';
import { mockSnackbar } from '../snackbar/snackbar.service.spec';
import { INITIAL_USER_STATE, User } from './user-service.model';
import { UsersService } from './users.service';

const user: User = {
  id: 1,
  firstName: 'Dios',
  lastName: 'Vo'
};

const list_users: User[] = [
  user,
  {
    id: 2,
    firstName: 'Thu',
    lastName: 'Phung'
  }
];

describe('UsersService', () => {
  let service: UsersService;

  const mockUserDetailsService: any = {
    all$: jest.fn().mockReturnValue(of(list_users)),
    remove$: jest.fn().mockReturnValue(of({})),
    create$: jest.fn().mockReturnValue(of(user)),
    update$: jest.fn().mockReturnValue(of(user)),
  };

  beforeEach(() => {
    service = new UsersService(mockSnackbar, mockUserDetailsService);
    jest.spyOn(service as any, 'setState');
  });

  test('should initialize service', () => {
    expect(service).toBeTruthy();
  });

  describe('should load and get the current state', () => {
    test('should load state when the request was successful', () => {
      service.loadState();
      expect(service['setState']).toBeCalledWith({
        data: list_users,
        loading: false
      });
    });

    test('should show error message when the request failed', () => {
      mockUserDetailsService.all$.mockReturnValue(throwError(() => new Error('Bad Request')));
      service.loadState();
      expect(service['setState']).toBeCalledWith({
        data: [],
        loading: false,
        error: 'Bad Request'
      });
    });

    test('should get the current state', (done) => {
      service['setState'](INITIAL_USER_STATE);
      service['users_state$'].subscribe((state: State<User>) => {
        expect(state).toEqual(INITIAL_USER_STATE);
        done();
      });
    });
  });

  describe('should execute job actions', () => {
    it('should update the selected user', () => {
      service['setState']({
        data: list_users
      });
      service.executeJob('update$', user.id);
      expect(service['setState']).toBeCalledWith({
        data: list_users,
        loading: false
      });
    });

    it('should create new user', () => {
      service['setState']({
        data: []
      });
      service.executeJob('create$', user.id);
      expect(service['setState']).toBeCalledWith({
        data: [user],
        loading: false
      });
    });

    it('should delete the selected user', () => {
      service['setState']({
        data: [user]
      });
      service.executeJob('remove$', user.id);
      expect(service['setState']).toBeCalledWith({
        data: [],
        loading: false
      });
    });

    it('should show error message when API failed', () => {
      service['setState']({
        data: [user]
      });
      mockUserDetailsService.remove$.mockReturnValue(throwError(() => new Error('Bad Request')));

      service.executeJob('remove$', user.id);

      expect(service['setState']).toBeCalledWith({
        loading: false
      });
      expect(mockSnackbar.error).toBeCalledWith('Bad Request');
    });
  });
});
