import { MOCK_LIST_COMMENTS } from '@lib/mocks/json-placeholder/comment.mock';
import { DestroyService } from '@lib/services/destroy/destroy.service';
import { of } from 'rxjs';
import { AdvancedCachingComponent } from './advanced-caching.component';

describe('AdvancedCachingComponent', () => {
  let component: AdvancedCachingComponent;

  const mockService: any = {
    comments: of(MOCK_LIST_COMMENTS),
    forceReload: jest.fn(),
  };

  beforeEach(() => {
    component = new AdvancedCachingComponent(new DestroyService(), mockService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    test('should init component after page load', () => {
      jest.spyOn(component as any, 'fetchComments');
      jest.spyOn(component as any, 'showNotification');

      component.ngOnInit();

      expect(component['fetchComments']).toBeCalled();
      expect(component['showNotification']).toBeCalled();
    });
  });

  describe('forceReload()', () => {
    test('should force reload to get new data', () => {
      jest.spyOn(component['forceReload$'], 'next');
      component.forceReload();

      expect(mockService.forceReload).toBeCalled();
      expect(component['forceReload$'].next).toBeCalled();
    });
  });

  describe('ngOnDestroy()', () => {
    test('should call force reload to refresh data', () => {
      jest.spyOn(component, 'forceReload');
      component.ngOnDestroy();
      expect(component.forceReload).toBeCalled();
    });
  });
});
