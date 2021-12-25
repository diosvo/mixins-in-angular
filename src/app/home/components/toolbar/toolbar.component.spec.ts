import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '@auth/components/login/login.component';
import { ConfirmDialogComponent } from '@lib/components/confirm-dialog/confirm-dialog.component';
import { of } from 'rxjs';
import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let dialog: MatDialog;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ToolbarComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes([
          {
            path: 'ui-components',
            component: ToolbarComponent
          }
        ]),

        MatIconModule,
        MatDialogModule,
        MatButtonModule,
        MatToolbarModule,
      ],
      providers: [
        {
          provide: MatDialog,
          useValue: { open: jest.fn() }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('openLoginDialog()', () => {
    jest.spyOn(dialog, 'open');
    component.openLoginDialog();
    expect(dialog.open).toBeCalledWith(LoginComponent, {
      width: '375px',
      disableClose: true,
    });
  });

  describe('openLogoutDialog() when user clicks on', () => {
    test('Logout button', () => {
      jest.spyOn(dialog, 'open').mockReturnValue({
        afterClosed: () => of(true)
      } as MatDialogRef<typeof ToolbarComponent>);
      jest.spyOn(component['router'], 'navigate');
      jest.spyOn(component['authService'], 'logout');

      component.openLogoutDialog();

      expect(dialog.open).toBeCalledWith(ConfirmDialogComponent, {
        data: {
          header: 'logout',
          body: 'Are you sure you want to logout?',
          btnClose: false
        },
        width: '425px',
        disableClose: true,
      });
      expect(component['authService'].logout).toBeCalled();
      expect(component['router'].navigate).toBeCalledWith(['/ui-components']);
    });

    test('Cancel button', () => {
      jest.spyOn(dialog, 'open').mockReturnValue({
        afterClosed: () => of(false)
      } as MatDialogRef<typeof ToolbarComponent>);
      component.openLogoutDialog();
      expect(dialog.open).toBeCalledWith(ConfirmDialogComponent, {
        data: {
          header: 'logout',
          body: 'Are you sure you want to logout?',
          btnClose: false
        },
        width: '425px',
        disableClose: true,
      });
    });
  });
});
