import { FormBuilder, FormControl } from '@angular/forms';
import { UserInput } from '@lib/models/user';
import { of } from 'rxjs';
import { HandleService } from '../base/handle.service';
import { InternalService, UserDetailsService } from './user-details.service';

const user: UserInput = {
  id: 1,
  name: 'Dios Vo',
  email: 'vtmn1212@gmail.com',
  hobbies: ['coding', 'basketball']
};

describe('InternalService', () => {
  let service: InternalService;

  const mockHttp: any = {
    get: jest.fn().mockReturnValue(of(user)),
    put: jest.fn().mockReturnValue(of(user)),
    post: jest.fn().mockReturnValue(of(user)),
    delete: jest.fn().mockReturnValue(of({})),
  };

  beforeEach(() => {
    service = new InternalService(mockHttp, new HandleService());
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('byId()', (done) => {
    service.byId(user.id).subscribe({
      next: (response: UserInput) => {
        expect(response).toEqual(user);
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
    byId: jest.fn().mockReturnValue(of(user)),
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

  test('buildForm()', () => {
    expect(service.buildForm()).toBeDefined();
  });

  test('loadFromApiAndFillForm$() to map value corresponding to specific id (Edit mode)', (done) => {
    jest.spyOn(service.isEdit$, 'next');
    service.loadFromApiAndFillForm$(user.id).subscribe(() => {
      expect(service.isEdit$.next).toBeCalledWith(true);
      expect(mockInternalService.byId).toBeCalledWith(user.id);
      done();
    });
  });

  test('initializeValue$() to get the default value (Create mode)', (done) => {
    jest.spyOn(service.isEdit$, 'next');
    service.initializeValue$().subscribe((response: UserInput) => {
      expect(service.isEdit$.next).toBeCalledWith(false);
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
    service['create$']().subscribe(() => {
      expect(mockInternalService.create).toBeCalledWith({ name: '', email: '', hobbies: [] });
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
