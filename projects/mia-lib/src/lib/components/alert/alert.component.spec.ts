import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  let component: AlertComponent;

  beforeEach(() => {
    component = new AlertComponent('success');
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
