import { MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@lib/components/confirm-dialog/confirm-dialog.component';
import { User } from '@lib/services/users/user-service.model';
import { of } from 'rxjs';
import { DetailsComponent } from '../details/details.component';
import { ListComponent } from './list.component';

const user: User = {
  name: 'Dios Vo',
  email: 'vtmn1212@gmail.com',
  hobbies: ['coding', 'basketball']
};

describe('ListComponent', () => {
  let component: ListComponent;

  const mockService: any = {
    loadState: jest.fn(),
    executeJob: jest.fn().mockReturnValue(of(user)),
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
      component.onBulk(user);
      expect(mockDialog.open).toBeCalledWith(DetailsComponent, {
        data: {
          user,
          isEdit: true,
        },
        width: '500px',
        disableClose: true,
      });
      expect(mockService.executeJob).toBeCalledWith('update$', user.id);
    });

    test('should open dialog to update user', () => {
      component.onBulk({});
      expect(mockDialog.open).toBeCalledWith(DetailsComponent, {
        data: {
          user: {
            hobbies: []
          },
          isEdit: false,
        },
        width: '500px',
        disableClose: true,
      });
      expect(mockService.executeJob).toBeCalledWith('create$', user.id);
    });
  });

  describe('onDelete()', () => {
    afterEach(() => {
      expect(mockDialog.open).toBeCalledWith(ConfirmDialogComponent, {
        data: {
          header: 'Delete',
          body: `Are you sure you want to delete ${user.name}?`,
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
      component.onDelete(user);
      expect(mockService.executeJob).toBeCalledWith('remove$', user.id);
    });

    test('should not call delete method when the user clicks on Close button', () => {
      jest.spyOn(mockDialog, 'open').mockReturnValue(
        { afterClosed: () => of(false) } as MatDialogRef<typeof ListComponent>
      );
      component.onDelete(user);
    });
  });
});
