import { User } from '@lib/models/json-placeholder/user.model';
import { State } from '@lib/models/server.model';
import { EAction } from '@lib/models/table';
import { of, throwError } from 'rxjs';
import { MOCK_LIST_USERS, MOCK_USER } from '../../../mocks/json-placeholder/user.mock';
import { mockSnackbar } from '../../snackbar/snackbar.service.spec';
import { INITIAL_USER_STATE } from './user-service.model';
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

  afterEach(() => {
    jest.clearAllMocks();
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

  describe('should adjust selected user', () => {
    test('should update the selected user', () => {
      const ANOTHER_USER: User = {
        ...MOCK_USER,
        id: 2
      };
      const EXTENDED_LIST: User[] = MOCK_LIST_USERS.concat(ANOTHER_USER);
      service['setState']({
        data: EXTENDED_LIST
      });

      service.adjust(EAction.UPDATE, MOCK_USER.id);
      expect(service['setState']).toBeCalledWith({
        data: EXTENDED_LIST,
        loading: false
      });
    });

    test('should create new user', () => {
      service['setState']({
        data: []
      });
      service.adjust(EAction.CREATE, null);
      expect(service['setState']).toBeCalledWith({
        data: MOCK_LIST_USERS,
        loading: false
      });
    });

    test('should show error message when API failed', () => {
      service['setState']({
        data: MOCK_LIST_USERS
      });
      mockUserDetailsService.update$.mockReturnValue(throwError(() => new Error('Bad Request')));

      service.adjust(EAction.UPDATE, MOCK_USER.id);

      expect(service['setState']).toBeCalledWith({
        loading: false
      });
      expect(mockSnackbar.error).toBeCalledWith('Bad Request');
    });
  });

  describe('should delete selected users', () => {
    test('should delete 1 user', () => {
      service['setState']({
        data: [MOCK_USER]
      });
      service.delete([MOCK_USER]);

      expect(service['setState']).toBeCalledWith({
        data: [],
        loading: false
      });
      expect(mockSnackbar.success).toBeCalledWith('The user has been deleted');
    });

    test('should delete multiple users', () => {
      const DUPLICATE_USERS = MOCK_LIST_USERS.concat(MOCK_USER);
      service['setState']({
        data: DUPLICATE_USERS
      });
      service.delete(DUPLICATE_USERS);

      expect(service['setState']).toBeCalledWith({
        data: [],
        loading: false
      });
      expect(mockSnackbar.success).toBeCalledWith('The selected users have been deleted');
    });

    test('should show error message when API failed', () => {
      service['setState']({
        data: MOCK_LIST_USERS
      });
      mockUserDetailsService.remove$.mockReturnValue(throwError(() => new Error('Bad Request')));

      service.delete(MOCK_LIST_USERS);

      expect(service['setState']).toBeCalledWith({
        loading: false
      });
      expect(mockSnackbar.error).toBeCalledWith('Bad Request');
    });
  });
});
