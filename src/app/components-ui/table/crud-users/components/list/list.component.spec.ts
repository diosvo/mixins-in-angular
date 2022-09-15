import { MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@lib/components/confirm-dialog/confirm-dialog.component';
import { MOCK_USER } from '@lib/services/users/user.mock';
import { of } from 'rxjs';
import { DetailsComponent } from '../details/details.component';
import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;

  const mockService: any = {
    loadState: jest.fn(),
    executeJob: jest.fn().mockReturnValue(of(MOCK_USER)),
  };

  const mockDialog: any = {
    open: jest.fn()
  };

  beforeEach(() => {
    component = new ListComponent(mockDialog, mockService);
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    test('should load state', () => {
      component.ngOnInit();
      expect(mockService.loadState).toBeCalled();
    });
  });

  describe('onBulk()', () => {
    beforeEach(() => {
      jest.spyOn(mockDialog, 'open').mockReturnValue(
        { afterClosed: () => of(true) } as MatDialogRef<typeof ListComponent>
      );
    });

    test('should open dialog to update user', () => {
      component.onBulk(MOCK_USER);
      expect(mockDialog.open).toBeCalledWith(DetailsComponent, {
        data: {
          user: MOCK_USER,
          isEdit: true,
        },
        width: '500px',
        disableClose: true,
      });
      expect(mockService.executeJob).toBeCalledWith('update$', MOCK_USER.id);
    });

    test('should open dialog to create new user', () => {
      component.onBulk({});
      expect(mockDialog.open).toBeCalledWith(DetailsComponent, {
        data: {
          user: {},
          isEdit: false,
        },
        width: '500px',
        disableClose: true,
      });
      expect(mockService.executeJob).toBeCalledWith('create$', undefined);
    });
  });

  describe('onDelete()', () => {
    afterEach(() => {
      expect(mockDialog.open).toBeCalledWith(ConfirmDialogComponent, {
        data: {
          header: 'Delete',
          body: `Are you sure you want to delete ${MOCK_USER.name}?`,
          btnClose: false
        },
        width: '500px',
        disableClose: true,
      });
    });

    test('should call delete method when the user clicks on Confirm button', () => {
      jest.spyOn(mockDialog, 'open').mockReturnValue(
        { afterClosed: () => of(true) } as MatDialogRef<typeof ListComponent>
      );
      component.onDelete(MOCK_USER);
      expect(mockService.executeJob).toBeCalledWith('remove$', MOCK_USER.id);
    });

    test('should not call delete method when the user clicks on Close button', () => {
      jest.spyOn(mockDialog, 'open').mockReturnValue(
        { afterClosed: () => of(false) } as MatDialogRef<typeof ListComponent>
      );
      component.onDelete(MOCK_USER);
    });
  });
});
