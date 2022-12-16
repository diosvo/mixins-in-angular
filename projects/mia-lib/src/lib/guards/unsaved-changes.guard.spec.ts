import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { GuardsCheckEnd, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UnsavedChangesDialogComponent } from '@lib/components/unsaved-changes-dialog/unsaved-changes-dialog.component';
import { Observable, of } from 'rxjs';
import { DeactivateComponent, UnsavedChangesGuard } from './unsaved-changes.guard';

class MockRouter {
  public navigate = new GuardsCheckEnd(
    0, 'http://localhost:4200/ui-components', 'http://localhost:4200/ui-components',
    {} as any, false
  );
  public events = new Observable(observer => {
    observer.next(this.navigate);
    observer.complete();
  });
}

describe('UnsavedChangesGuard', () => {
  let guard: UnsavedChangesGuard;
  let dialog: MatDialog;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,

        MatDialogModule
      ],
      providers: [
        {
          provide: Router,
          useClass: MockRouter
        }
      ],
    });
  }));

  beforeEach(() => {
    guard = TestBed.inject(UnsavedChangesGuard);
    dialog = TestBed.inject(MatDialog);
  });

  test('should create an instance', () => {
    expect(guard).toBeTruthy();
  });

  describe('should show dialog when there has changed', () => {
    let component: DeactivateComponent;

    beforeEach(() => {
      component = {
        internalNavigation: false,
        canDeactivate: jest.fn().mockReturnValue(false),
        saveChanges: jest.fn(),
        discardChanges: jest.fn(),
      };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should save changes (when the user clicks on Save button)', (done) => {
      jest.spyOn(dialog, 'open').mockReturnValue(
        { afterClosed: () => of(false) } as MatDialogRef<typeof UnsavedChangesDialogComponent>
      );

      guard.canDeactivate(component).subscribe({
        next: (discard: boolean) => {
          expect(discard).toBe(false);
          expect(component.saveChanges).toBeCalledWith('http://localhost:4200/ui-components');
          done();
        },
        error: ({ message }) => fail(message),
      });
    });

    test('should NOT save changes (when the user clicks on Discard button)', (done) => {
      jest.spyOn(dialog, 'open').mockReturnValue(
        { afterClosed: () => of(true) } as MatDialogRef<typeof UnsavedChangesDialogComponent>
      );

      guard.canDeactivate(component).subscribe({
        next: (discard: boolean) => {
          expect(discard).toBe(true);
          done();
        },
        error: ({ message }) => fail(message),
      });
    });
  });

  describe('returns true (not show dialog)', () => {
    test('when there has not been changed', (done) => {
      const component = {
        internalNavigation: false,
        canDeactivate: jest.fn().mockReturnValue(true),
        saveChanges: jest.fn(),
        discardChanges: jest.fn(),
      };
      guard.canDeactivate(component).subscribe({
        next: (changes: boolean) => {
          expect(changes).toBe(true);
          done();
        },
        error: ({ message }) => fail(message),
      });
    });

    test('when allow navigation is true', (done) => {
      const component = {
        internalNavigation: true,
        canDeactivate: jest.fn().mockReturnValue(true),
        saveChanges: jest.fn(),
        discardChanges: jest.fn(),
      };
      guard.canDeactivate(component).subscribe({
        next: (changes: boolean) => {
          expect(changes).toBe(true);
          done();
        },
        error: ({ message }) => fail(message),
      });
    });
  });
});