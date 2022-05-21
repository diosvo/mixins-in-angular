import { User } from '@lib/services/users/user-service.model';
import { of } from 'rxjs';
import { SearchPageComponent } from './search-page.component';

describe('SearchPageComponent', () => {
  let component: SearchPageComponent;

  const mockService: any = {
    all: jest.fn().mockReturnValue(of([])),
  };

  beforeEach(() => {
    component = new SearchPageComponent(mockService);
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('ngOnInit() to set up component after page load', (done) => {
    component.ngOnInit();
    component.users$.subscribe((response: User[]) => {
      expect(response).toEqual([]);
      done();
    });
  });

  test('stateChanges()', () => {
    jest.spyOn(component.selected$, 'next');
    component.stateChanges('diosvo');
    expect(component.selected$.next).toBeCalledWith('diosvo');
  });
});
