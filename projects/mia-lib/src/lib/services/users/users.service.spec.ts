import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { endpoint, User } from './user-service.model';
import { UsersService } from './users.service';

const user: User = {
  id: 1,
  firstName: 'Dios',
  lastName: 'Vo'
};

const list_users: User[] = [user];

describe('UsersService', () => {
  let service: UsersService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [UsersService]
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

  test('all() to get all users from the response API', () => {
    service.all().subscribe({
      next: (response: User[]) => {
        expect(response).toEqual(list_users);
        expect(response.length).toEqual(1);
      },
      error: ({ message }) => fail(message)
    });

    const request = http.expectOne(endpoint);
    expect(request.request.method).toBe('GET');
    request.flush(list_users);
  });

  test('lookup() to find out user corresponding to specific id', () => {
    service.lookup(of(list_users), of([1])).subscribe({
      next: (response: User[]) => {
        expect(response).toEqual(list_users);
        expect(response.length).toEqual(1);
      },
      error: ({ message }) => fail(message)
    });

    service.lookup(of(list_users), of([2])).subscribe({
      next: (response: User[]) => {
        expect(response).toEqual([]);
        expect(response.length).toEqual(0);
      },
      error: ({ message }) => fail(message)
    });
  });
});
