import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToolbarComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatDialogModule
      ],
      providers: [
        {
          provide: MatDialog,
          useValue: { open: () => of() }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should call', () => {
    test('openLoginDialog()', () => {
      jest.spyOn(dialog, 'open');
      component.openLoginDialog();
      expect(dialog.open).toHaveBeenCalled();
    });

    describe('openLogoutDialog() when result returns', () => {
      test('true', () => {
        jest.spyOn(dialog, 'open').mockReturnValue({ afterClosed: () => of(true) } as MatDialogRef<typeof ToolbarComponent>);;
        component.openLogoutDialog();
        expect(dialog.open).toHaveBeenCalled();
      });

      test('false', () => {
        jest.spyOn(dialog, 'open').mockReturnValue({ afterClosed: () => of(false) } as MatDialogRef<typeof ToolbarComponent>);;
        component.openLogoutDialog();
        expect(dialog.open).toHaveBeenCalled();
      });
    });
  });
});
