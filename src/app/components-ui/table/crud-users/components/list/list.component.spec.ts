import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmDialogComponent } from '@lib/components/confirm-dialog/confirm-dialog.component';
import { CustomTableModule } from '@lib/components/custom-table/custom-table.module';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';
import { UsersService } from '@lib/services/users/users.service';
import { of, throwError } from 'rxjs';
import { ListComponent } from './list.component';

const user = {
  name: 'Dios Vo',
  email: 'vtmn1212@gmail.com',
  hobbies: ['coding', 'basketball']
};

const snackbar = {
  success: jest.fn(),
  error: jest.fn()
};

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let dialog: MatDialog;

  const service = {
    all: jest.fn().mockReturnValue(of([])),
    delete: jest.fn().mockReturnValue(of({}))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [
        CustomTableModule,

        HttpClientModule,
        RouterTestingModule,
        BrowserAnimationsModule,

        MatDialogModule,
        MatSnackBarModule,
        MatProgressBarModule,
      ],
      providers: [
        {
          provide: UsersService,
          useValue: service
        },
        {
          provide: SnackbarService,
          useValue: snackbar
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            header: 'Delete',
            body: `Are you sure you want to delete ${user.name}`,
            btnClose: false
          }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('openConfirmDialog() when the user press on', () => {
    test('Confirm button', () => {
      jest.spyOn(component as any, 'delete');
      jest.spyOn(dialog, 'open').mockReturnValue(
        { afterClosed: () => of(true) } as MatDialogRef<typeof ListComponent>
      );

      component.openConfirmDialog(user);

      expect(dialog.open).toBeCalledWith(ConfirmDialogComponent, {
        data: {
          header: 'Delete',
          body: `Are you sure you want to delete ${user.name}?`,
          btnClose: false
        },
        width: '500px',
        disableClose: true,
      });
      expect(component['delete']).toBeCalled();
    });

    test('Close button', () => {
      jest.spyOn(dialog, 'open').mockReturnValue(
        { afterClosed: () => of(false) } as MatDialogRef<typeof ListComponent>
      );
      component.openConfirmDialog(user);
      expect(dialog.open).toBeCalledWith(ConfirmDialogComponent, {
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

  describe('delete() when the API returns', () => {
    test('success', () => {
      component['delete'](user);
      expect(snackbar.success).toBeCalledWith(`${user.name} has been deleted.`);
    });

    test('error', () => {
      service.delete.mockReturnValue(throwError(() => new Error('ERROR_MESSAGE')));
      component['delete'](user);
      expect(snackbar.error).toBeCalledWith('ERROR_MESSAGE');
    });
  });
});
