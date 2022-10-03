import { of } from 'rxjs';
import { AdvancedCachingComponent } from './advanced-caching.component';

describe('AdvancedCachingComponent', () => {
  let component: AdvancedCachingComponent;

  const mockService: any = {
    jokes: of([]),
    forceReload: jest.fn(),
  };

  beforeEach(() => {
    component = new AdvancedCachingComponent(mockService);
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
