import { MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@lib/components/confirm-dialog/confirm-dialog.component';
import { MOCK_LIST_USERS, MOCK_USER } from '@lib/mocks/json-placeholder/user.mock';
import { User } from '@lib/models/json-placeholder/user.model';
import { EAction } from '@lib/models/table';
import { of } from 'rxjs';
import { DetailsComponent } from '../details/details.component';
import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;

  const mockService: any = {
    loadState: jest.fn(),
    adjust: jest.fn().mockReturnValue(of(MOCK_USER)),
    delete: jest.fn().mockReturnValue(of([])),
  };

  const mockDialog: any = {
    open: jest.fn()
  };

  beforeEach(() => {
    component = new ListComponent(mockDialog, mockService);
  });

  afterEach(() => {
    jest.clearAllMocks();
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
      expect(mockService.adjust).toBeCalledWith(EAction.UPDATE, MOCK_USER.id);
    });

    test('should open dialog to create new user', () => {
      component.onBulk({} as User);
      expect(mockDialog.open).toBeCalledWith(DetailsComponent, {
        data: {
          user: {},
          isEdit: false,
        },
        width: '500px',
        disableClose: true,
      });
      expect(mockService.adjust).toBeCalledWith(EAction.CREATE, undefined);
    });
  });

  describe('onDelete()', () => {
    describe('should call delete method when the user clicks on Confirm button', () => {
      beforeEach(() => {
        jest.spyOn(mockDialog, 'open').mockReturnValue(
          { afterClosed: () => of(true) } as MatDialogRef<typeof ListComponent>
        );
        jest.spyOn(component, 'onCancel');
      });

      afterEach(() => {
        expect(component.onCancel).toBeCalled();
      });

      test('should delete 1 user', () => {
        component.onDelete([MOCK_USER]);
        expect(mockDialog.open).toBeCalledWith(ConfirmDialogComponent, {
          data: {
            title: 'Delete',
            content: `Are you sure you want to delete ${MOCK_USER.name}?`,
          },
          width: '450px',
          disableClose: true,
        });
        expect(mockService.delete).toBeCalledWith([MOCK_USER]);
      });

      test('should delete multiple users', () => {
        const DUPLICATE_USERS = MOCK_LIST_USERS.concat(MOCK_USER);
        component.onDelete(DUPLICATE_USERS);
        expect(mockDialog.open).toBeCalledWith(ConfirmDialogComponent, {
          data: {
            title: 'Delete',
            template: component['selectionRef'],
            details: DUPLICATE_USERS
          },
          width: '450px',
          disableClose: true,
        });
        expect(mockService.delete).toBeCalledWith(DUPLICATE_USERS);
      });
    });

    test('should not call delete method when the user clicks on Close button', () => {
      jest.spyOn(mockDialog, 'open').mockReturnValue(
        { afterClosed: () => of(false) } as MatDialogRef<typeof ListComponent>
      );
      component.onDelete(MOCK_LIST_USERS);
      expect(mockService.delete).not.toBeCalled();
    });
  });

  describe('onCancel()', () => {
    test('should deselect all items when the user click on Cancel button', () => {
      (component as any).table = {
        deselectAll: jest.fn()
      };
      component.onCancel();
      expect(component['table'].deselectAll).toBeCalled();
    });
  });
});
