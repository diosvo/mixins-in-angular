import { MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@lib/components/confirm-dialog/confirm-dialog.component';
import { mockSnackbar } from '@lib/services/snackbar/snackbar.service.spec';
import { User } from '@lib/services/users/user-service.model';
import { of, throwError } from 'rxjs';
import { ListComponent } from './list.component';

const user: User = {
  name: 'Dios Vo',
  email: 'vtmn1212@gmail.com',
  hobbies: ['coding', 'basketball']
};

const list_users = [user];

describe('ListComponent', () => {
  let component: ListComponent;

  const mockService: any = {
    all: jest.fn().mockReturnValue(of(list_users)),
  };

  const mockDetailsService: any = {
    delete: jest.fn().mockReturnValue(of({}))
  };

  const mockDialog: any = {
    open: jest.fn()
  };

  beforeEach(() => {
    component = new ListComponent(mockDialog, mockService, mockSnackbar, mockDetailsService);
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('call list users when the API returns', () => {
    test('success', (done) => {
      component.ngOnInit();
      component.users$.subscribe((response: Array<User>) => {
        expect(response).toEqual(list_users);
        done();
      });
    });

    test('error', () => {
      jest.spyOn(component.errorMessage$, 'next');
      mockService.all.mockReturnValue(throwError(() => new Error('ERROR_MESSAGE')));

      component.ngOnInit();
      component.users$.subscribe(() => expect(component.errorMessage$.next).toBeCalledWith('ERROR_MESSAGE'));
    });
  });

  describe('openConfirmDialog()', () => {
    test('should call delete methos when the user clicks on Confirm button', () => {
      jest.spyOn(component as any, 'delete');
      jest.spyOn(mockDialog, 'open').mockReturnValue(
        { afterClosed: () => of(true) } as MatDialogRef<typeof ListComponent>
      );

      component.openConfirmDialog(user);

      expect(mockDialog.open).toBeCalledWith(ConfirmDialogComponent, {
        data: {
          header: 'Delete',
          body: `Are you sure you want to delete ${user.name}?`,
          btnClose: false
        },
        width: '500px',
        disableClose: true,
      });
      expect(component['delete']).toBeCalledWith(user);
    });

    test('should not call delete method when the user clicks on Close button', () => {
      jest.spyOn(mockDialog, 'open').mockReturnValue(
        { afterClosed: () => of(false) } as MatDialogRef<typeof ListComponent>
      );
      component.openConfirmDialog(user);
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
  });
});
