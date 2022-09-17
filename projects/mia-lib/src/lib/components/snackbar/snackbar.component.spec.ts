import { SnackbarComponent } from './snackbar.component';

describe('SnackbarComponent', () => {
  let component: SnackbarComponent;

  const mockRef: any = {};

  beforeEach(() => {
    component = new SnackbarComponent(mockRef, 'ERROR_MESSAGE');
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
