import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { InternalService, UserDetailsService } from './user-details.service';
import { endpoint, id_endpoint, User } from './user-service.model';

const user: User = {
  id: 1,
  name: 'Dios Vo',
  email: 'vtmn1212@gmail.com',
  hobbies: ['coding', 'basketball']
};

describe('InternalService', () => {
  let service: InternalService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [InternalService]
    });

    service = TestBed.inject(InternalService);
    http = TestBed.inject(HttpTestingController);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('byId()', (done) => {
    service.byId(user.id).subscribe({
      next: (response: User) => {
        expect(response).toEqual(user);
        done();
      },
      error: ({ message }) => fail(message)
    });

    const request = http.expectOne(id_endpoint(user.id));
    expect(request.request.method).toBe('GET');
    request.flush(user);
  });

  test('create()', (done) => {
    service.create(user).subscribe({
      next: (response: User) => {
        expect(response).toEqual(user);
        done();
      },
      error: ({ message }) => fail(message)
    });

    const request = http.expectOne(endpoint);
    expect(request.request.method).toBe('POST');
    request.flush(user);
  });

  test('update()', (done) => {
    service.update(user).subscribe({
      next: (response: User) => {
        expect(response).toEqual(user);
        done();
      },
      error: ({ message }) => fail(message)
    });

    const request = http.expectOne(id_endpoint(user.id));
    expect(request.request.method).toBe('PUT');
    request.flush(user);
  });

  test('remove()', (done) => {
    service.remove(user.id).subscribe({
      next: (response: User) => {
        expect(response).toEqual(user);
        done();
      },
      error: ({ message }) => fail(message)
    });

    const request = http.expectOne(id_endpoint(user.id));
    expect(request.request.method).toBe('DELETE');
    request.flush(user);
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
    jest.spyOn(service, 'setFormValue');

    service.loadFromApiAndFillForm$(user.id).subscribe(() => {
      expect(service.isEdit$.next).toBeCalledWith(true);
      done();
    });
    expect(service.setFormValue).toBeCalledWith(user);
  });

  test('initializeValue$() to get the default value (Create mode)', (done) => {
    jest.spyOn(service.form, 'reset');
    jest.spyOn(service.isEdit$, 'next');

    service.initializeValue$().subscribe(() => {
      expect(service.isEdit$.next).toBeCalledWith(false);
      done();
    });

    expect(service.form.reset).toBeCalled();
    expect(mockInternalService.byId).toBeCalledWith(user.id);
  });

  test('create$()', (done) => {
    jest.spyOn(service.form, 'reset');
    service['create$']().subscribe(() => done());

    expect(service.form.reset).toBeCalled();
    expect(mockInternalService.create).toBeCalledWith({ name: '', email: '', hobbies: [] });
  });

  test('update$()', (done) => {
    jest.spyOn(service, 'setFormValue');
    service.form.addControl('id', new FormControl(user.id));
    service.form.setValue(user);

    service['update$']().subscribe(() => done());

    expect(service.setFormValue).toBeCalledWith(user);
    expect(mockInternalService.update).toBeCalledWith(user);
  });

  test('remove$()', (done) => {
    service.remove$(user.id).subscribe(() => done());
    expect(mockInternalService.remove).toBeCalledWith(user.id);
  });
});