import { FormBuilder, FormControl } from '@angular/forms';
import { UserInput } from '@lib/models/user';
import { of } from 'rxjs';
import { ErrorHandlerService } from '../base/error-handler.service';
import { InternalUserService, UserDetailsService } from './user-details.service';
import { User } from './user-service.model';
import { MOCK_LIST_USERS, MOCK_USER } from './user.mock';

describe('InternalUserService', () => {
  let service: InternalUserService;

  const mockHttp: any = {
    get: jest.fn().mockReturnValue(of(MOCK_LIST_USERS)),
    put: jest.fn().mockReturnValue(of(MOCK_USER)),
    post: jest.fn().mockReturnValue(of(MOCK_USER)),
    delete: jest.fn().mockReturnValue(of({})),
  };

  beforeEach(() => {
    service = new InternalUserService(mockHttp, new ErrorHandlerService());
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('all()', (done) => {
    service.all().subscribe({
      next: (response: User[]) => {
        expect(response).toEqual(MOCK_LIST_USERS);
        done();
      },
      error: ({ message }) => fail(message)
    });
  });

  test('create()', (done) => {
    service.create(MOCK_USER).subscribe({
      next: (response: UserInput) => {
        expect(response).toEqual(MOCK_USER);
        done();
      },
      error: ({ message }) => fail(message)
    });
  });

  test('update()', (done) => {
    service.update(MOCK_USER).subscribe({
      next: (response: UserInput) => {
        expect(response).toEqual(MOCK_USER);
        done();
      },
      error: ({ message }) => fail(message)
    });
  });

  test('remove()', (done) => {
    service.remove(MOCK_USER.id).subscribe({
      next: () => done(),
      error: ({ message }) => fail(message)
    });
  });
});

describe('UserDetailsService', () => {
  let service: UserDetailsService;

  const mockInternalService: any = {
    all: jest.fn().mockReturnValue(of(MOCK_LIST_USERS)),
    create: jest.fn().mockReturnValue(of(MOCK_USER)),
    update: jest.fn().mockReturnValue(of(MOCK_USER)),
    remove: jest.fn().mockReturnValue(of({})),
  };

  beforeEach(() => {
    service = new UserDetailsService(new FormBuilder(), mockInternalService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('all$()', (done) => {
    service.all$().subscribe((response: User[]) => {
      expect(response).toEqual(MOCK_LIST_USERS);
      done();
    });
  });

  test('buildForm()', () => {
    expect(service.buildForm()).toBeDefined();
  });

  test('loadFromApiAndFillForm$() to map value corresponding to specific id (Edit mode)', (done) => {
    service.loadFromApiAndFillForm$(MOCK_USER).subscribe((response: UserInput) => {
      expect(response).toEqual(MOCK_USER);
      done();
    });
  });

  test('initializeValue$() to get the default value (Create mode)', (done) => {
    service.initializeValue$().subscribe((response: UserInput) => {
      expect(response).toEqual({
        id: null,
        name: '',
        email: '',
        hobbies: []
      });
      done();
    });
  });

  test('create$()', (done) => {
    const { id, ...rest } = MOCK_USER;
    service.form.setValue(MOCK_USER);
    service['create$']().subscribe(() => {
      expect(mockInternalService.create).toBeCalledWith(rest);
      done();
    });
  });

  test('update$()', (done) => {
    service.form.addControl('id', new FormControl(MOCK_USER.id));
    service.form.setValue(MOCK_USER);
    service['update$']().subscribe(() => {
      expect(mockInternalService.update).toBeCalledWith(MOCK_USER);
      done();
    });
  });

  test('remove$()', (done) => {
    service.remove$(MOCK_USER.id).subscribe(() => done());
    expect(mockInternalService.remove).toBeCalledWith(MOCK_USER.id);
  });
});
