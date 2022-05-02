import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { User, users_endpoint } from './user-service.model';
import { UsersService } from './users.service';

const user: User = {
  id: 1,
  firstName: 'Dios',
  lastName: 'Vo'
};

const list_users: Array<User> = [user];

describe('UsersService', () => {
  let service: UsersService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    });

    service = TestBed.inject(UsersService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('all()', () => {
    service.all().subscribe({
      next: (response: Array<User>) => {
        expect(response).toEqual(list_users);
        expect(response.length).toEqual(1);
      },
      error: ({ message }) => fail(message)
    });

    const request = http.expectOne(users_endpoint);
    expect(request.request.method).toBe('GET');
    request.flush(list_users);
  });

  test('delete()', (done) => {
    service.delete(+user.id).subscribe({
      next: (response: User) => {
        expect(response).toEqual({});
        done();
      },
      error: ({ message }) => fail(message)
    });

    const request = http.expectOne(user_id_endpoint(user.id));
    expect(request.request.method).toBe('DELETE');
    request.flush({});
  });
});
