import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from './snackbar.service';

export const mockSnackbar: any = {
  success: jest.fn(),
  error: jest.fn()
};

describe('SnackbarService', () => {
  let service: SnackbarService;
  const message = 'This is message string' as const;

  const snackbar = {
    openFromComponent: jest.fn()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: MatSnackBar,
          useValue: snackbar
        }
      ]
    });
    service = TestBed.inject(SnackbarService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('show snackbar based on type:', () => {
    beforeEach(() => jest.spyOn(service as any, 'show'));

    test('success', () => {
      service.success(message);
      expect(service['show']).toBeCalledWith(message, 'alert-success');
    });

    test('warning', () => {
      service.warning(message);
      expect(service['show']).toBeCalledWith(message, 'alert-warning');
    });

    test('error', () => {
      service.error(message);
      expect(service['show']).toBeCalledWith(message, 'alert-error');
    });
  });
});
