import { FormBuilder, FormControl } from '@angular/forms';
import { UserInput } from '@lib/models/user';
import { of } from 'rxjs';
import { HandleService } from '../base/handle.service';
import { InternalUserService, UserDetailsService } from './user-details.service';
import { User } from './user-service.model';

const user: UserInput = {
  id: 1,
  name: 'Dios Vo',
  email: 'vtmn1212@gmail.com',
  hobbies: ['coding', 'basketball']
};

const list_users: UserInput[] = [user];

describe('InternalUserService', () => {
  let service: InternalUserService;

  const mockHttp: any = {
    get: jest.fn().mockReturnValue(of(list_users)),
    put: jest.fn().mockReturnValue(of(user)),
    post: jest.fn().mockReturnValue(of(user)),
    delete: jest.fn().mockReturnValue(of({})),
  };

  beforeEach(() => {
    service = new InternalUserService(mockHttp, new HandleService());
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('all()', (done) => {
    service.all().subscribe({
      next: (response: User[]) => {
        expect(response).toEqual(list_users);
        done();
      },
      error: ({ message }) => fail(message)
    });
  });

  test('create()', (done) => {
    service.create(user).subscribe({
      next: (response: UserInput) => {
        expect(response).toEqual(user);
        done();
      },
      error: ({ message }) => fail(message)
    });
  });

  test('update()', (done) => {
    service.update(user).subscribe({
      next: (response: UserInput) => {
        expect(response).toEqual(user);
        done();
      },
      error: ({ message }) => fail(message)
    });
  });

  test('remove()', (done) => {
    service.remove(user.id).subscribe({
      next: () => done(),
      error: ({ message }) => fail(message)
    });
  });
});

describe('UserDetailsService', () => {
  let service: UserDetailsService;

  const mockInternalService: any = {
    all: jest.fn().mockReturnValue(of(list_users)),
    create: jest.fn().mockReturnValue(of(user)),
    update: jest.fn().mockReturnValue(of(user)),
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
      expect(response).toEqual(list_users);
      done();
    });
  });

  test('buildForm()', () => {
    expect(service.buildForm()).toBeDefined();
  });

  test('loadFromApiAndFillForm$() to map value corresponding to specific id (Edit mode)', (done) => {
    service.loadFromApiAndFillForm$(user).subscribe((response: UserInput) => {
      expect(response).toEqual(user);
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
    const { id, ...rest } = user;
    service.form.setValue(user);
    service['create$']().subscribe(() => {
      expect(mockInternalService.create).toBeCalledWith(rest);
      done();
    });
  });

  test('update$()', (done) => {
    service.form.addControl('id', new FormControl(user.id));
    service.form.setValue(user);
    service['update$']().subscribe(() => {
      expect(mockInternalService.update).toBeCalledWith(user);
      done();
    });
  });

  test('remove$()', (done) => {
    service.remove$(user.id).subscribe(() => done());
    expect(mockInternalService.remove).toBeCalledWith(user.id);
  });
});
