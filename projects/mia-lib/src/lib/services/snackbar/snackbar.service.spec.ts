import { SnackbarComponent } from '@lib/components/snackbar/snackbar.component';
import { SnackbarService } from './snackbar.service';

export const mockSnackbar: any = {
  show: jest.fn()
};

describe('SnackbarService', () => {
  let service: SnackbarService;

  const message = 'This is message' as const;
  const snackbar: any = {
    openFromComponent: jest.fn()
  };

  beforeEach(() => {
    service = new SnackbarService(snackbar);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('show()', () => {
    test('should show a message', () => {
      service.show(message);
      expect(snackbar.openFromComponent).toBeCalledWith(SnackbarComponent, {
        data: message,
        duration: 30000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    });
  });
});
