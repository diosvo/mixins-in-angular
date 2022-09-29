import { ConfirmDialogComponent } from './confirm-dialog.component';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;

  beforeEach(() => {
    component = new ConfirmDialogComponent({
      title: 'logout',
      content: 'Are you sure you want to logout?'
    });
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
