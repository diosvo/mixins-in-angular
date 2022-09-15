import { State } from '@lib/models/server.model';
import { of, throwError } from 'rxjs';
import { mockSnackbar } from '../snackbar/snackbar.service.spec';
import { INITIAL_USER_STATE, User } from './user-service.model';
import { MOCK_LIST_USERS, MOCK_USER } from './user.mock';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  const mockUserDetailsService: any = {
    all$: jest.fn().mockReturnValue(of(MOCK_LIST_USERS)),
    remove$: jest.fn().mockReturnValue(of({})),
    create$: jest.fn().mockReturnValue(of(MOCK_USER)),
    update$: jest.fn().mockReturnValue(of(MOCK_USER)),
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
        data: MOCK_LIST_USERS,
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
        data: MOCK_LIST_USERS
      });
      service.executeJob('update$', MOCK_USER.id);
      expect(service['setState']).toBeCalledWith({
        data: MOCK_LIST_USERS,
        loading: false
      });
    });

    it('should create new user', () => {
      service['setState']({
        data: []
      });
      service.executeJob('create$', MOCK_USER.id);
      expect(service['setState']).toBeCalledWith({
        data: [MOCK_USER],
        loading: false
      });
    });

    it('should delete the selected user', () => {
      service['setState']({
        data: [MOCK_USER]
      });
      service.executeJob('remove$', MOCK_USER.id);
      expect(service['setState']).toBeCalledWith({
        data: [],
        loading: false
      });
    });

    it('should show error message when API failed', () => {
      service['setState']({
        data: [MOCK_USER]
      });
      mockUserDetailsService.remove$.mockReturnValue(throwError(() => new Error('Bad Request')));

      service.executeJob('remove$', MOCK_USER.id);

      expect(service['setState']).toBeCalledWith({
        loading: false
      });
      expect(mockSnackbar.error).toBeCalledWith('Bad Request');
    });
  });
});
