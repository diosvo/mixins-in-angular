import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserDetailsService } from './user-details.service';
import { User, users_endpoint, user_id_endpoint } from './user-service.model';

const user: User = {
  id: 1,
  name: 'Dios Vo',
  email: 'vtmn1212@gmail.com',
  hobbies: ['coding', 'basketball']
};

describe('UserDetailsService', () => {
  let service: UserDetailsService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    });

    service = TestBed.inject(UserDetailsService);
    http = TestBed.inject(HttpTestingController);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('byId()', (done) => {
    service.byId(+user.id).subscribe({
      next: (response: User) => {
        expect(response).toEqual(user);
        done();
      },
      error: ({ message }) => fail(message)
    });

    const request = http.expectOne(users_endpoint + user.id);
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

    const request = http.expectOne(users_endpoint);
    expect(request.request.method).toBe('POST');
    request.flush(user);
  });

  test('update()', (done) => {
    jest.spyOn(service['_user$'], 'next');
    service.update(user).subscribe({
      next: (response: User) => {
        expect(response).toEqual(user);
        expect(service['_user$'].next).toBeCalledWith(user);
        done();
      },
      error: ({ message }) => fail(message)
    });

    const request = http.expectOne(user_id_endpoint(user.id));
    expect(request.request.method).toBe('PUT');
    request.flush(user);
  });
});
