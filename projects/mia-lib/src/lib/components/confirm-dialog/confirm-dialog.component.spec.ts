import { ConfirmDialogComponent } from './confirm-dialog.component';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;

  beforeEach(() => {
    component = new ConfirmDialogComponent({
      header: 'logout',
      body: 'Are you sure you want to logout?'
    });
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
