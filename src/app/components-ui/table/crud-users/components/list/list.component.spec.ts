import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmDialogComponent } from '@lib/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModule } from '@lib/components/confirm-dialog/confirm-dialog.module';
import { CustomButtonModule } from '@lib/components/custom-button/custom-button.module';
import { CustomTableModule } from '@lib/components/custom-table/custom-table.module';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';
import { User } from '@lib/services/users/user-service.model';
import { UsersService } from '@lib/services/users/users.service';
import { of, throwError } from 'rxjs';
import { ListComponent } from './list.component';

const user: User = {
  name: 'Dios Vo',
  email: 'vtmn1212@gmail.com',
  hobbies: ['coding', 'basketball']
};

const list_users = [user];

const snackbar = {
  success: jest.fn(),
  error: jest.fn()
};

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let dialog: MatDialog;

  const service = {
    all: jest.fn().mockReturnValue(of(list_users)),
    delete: jest.fn().mockReturnValue(of({}))
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [
        CustomTableModule,
        CustomButtonModule,
        ConfirmDialogModule,

        HttpClientModule,
        RouterTestingModule,
        BrowserAnimationsModule,

        MatProgressBarModule
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
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
      service.all.mockReturnValue(throwError(() => new Error('ERROR_MESSAGE')));

      component.ngOnInit();
      component.users$.subscribe(() => expect(component.errorMessage$.next).toBeCalledWith('ERROR_MESSAGE'));
    });
  });

  describe('openConfirmDialog() when the user presses on', () => {
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
    test.skip('success', fakeAsync(() => {
      component['delete'](user);
      fixture.detectChanges();
      tick();

      component.users$.subscribe((response: Array<User>) => {
        expect(response).toEqual([]);
        expect(response.length).toBe(0);
        expect(snackbar.success).toBeCalledWith(`${user.name} has been deleted.`);
      });
    }));

    test.skip('error', fakeAsync(() => {
      service.delete.mockReturnValue(throwError(() => new Error('ERROR_MESSAGE')));

      component['delete'](user);
      fixture.detectChanges();
      tick();

      expect(snackbar.error).toBeCalledWith('ERROR_MESSAGE');
    }));
  });
});
