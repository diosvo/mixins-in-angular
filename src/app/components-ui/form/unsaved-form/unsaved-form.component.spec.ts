import { DestroyService } from '@lib/services/destroy/destroy.service';
import { mockSnackbar } from '@lib/services/snackbar/snackbar.service.spec';
import { UnsavedFormComponent } from './unsaved-form.component';

describe('UnsavedFormComponent', () => {
  let component: UnsavedFormComponent;

  const mockRouter: any = {
    navigate: jest.fn(),
    url: 'form/unsaved-form'
  };

  const mockDetectPermissionService: any = {
    hasPermission: false
  };

  beforeEach(() => {
    component = new UnsavedFormComponent(mockRouter, new DestroyService(), mockSnackbar, mockDetectPermissionService);
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('ngOnInit()', () => {
    jest.spyOn(component as any, 'watchForChanges');
    component.ngOnInit();
    expect(component['watchForChanges']).toBeCalled();
  });

  describe('watchForChanges()', () => {
    beforeEach(() => {
      component['vm$'].next('Dios');
    });

    test('returns false if there has not been changed', () => {
      component['watchForChanges']();
      component.name.setValue('Dios');
      expect(component.hasChanged).toBe(false);
    });

    test('returns true if there has changed', () => {
      component['watchForChanges']();
      component.name.setValue('Dios Vo');
      expect(component.hasChanged).toBe(true);
    });
  });

  describe('canDeactivate()', () => {
    test('returns true when there has not been changed or user does NOT have permission to update', () => {
      component.hasChanged = false;
      expect(component.canDeactivate()).toBe(true);
    });

    test('returns false when there has changed or user has permission to update', () => {
      component.hasChanged = true;
      mockDetectPermissionService.hasPermission = true;
      expect(component.canDeactivate()).toBe(false);
    });
  });

  describe('saveChanges()', () => {
    describe('should save changes', () => {
      beforeEach(() => {
        component.name.setValue('Dios Vo');
        jest.spyOn(component['vm$'], 'next');
      });

      afterEach(() => {
        expect(component['vm$'].next).toBeCalledWith('Dios Vo');
      });

      test('should not navigate to somewhere else (user clicks on Save button)', () => {
        component.saveChanges();
        expect(mockSnackbar.success).toBeCalledWith('Update successfully!');
        expect(mockRouter.navigate).toBeCalledWith([mockRouter.url]);
      });

      test('should navigate to another page if user wants to navigate away from the current page', () => {
        component.saveChanges('functions');
        expect(mockSnackbar.success).toBeCalledWith('Update successfully!');
        expect(mockRouter.navigate).toBeCalledWith(['functions']);
      });
    });
  });
});
