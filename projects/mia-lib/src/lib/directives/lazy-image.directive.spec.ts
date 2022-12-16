import { LazyImageDirective } from './lazy-image.directive';

describe('LazyImageDirective', () => {
  let directive: LazyImageDirective;

  const mockElementRef: any = {
    nativeElement: {
      setAttribute: jest.fn()
    }
  };

  beforeEach(() => {
    directive = new LazyImageDirective(mockElementRef);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
