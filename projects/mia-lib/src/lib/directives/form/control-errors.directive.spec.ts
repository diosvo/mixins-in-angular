import { DestroyService } from '@lib/services/destroy/destroy.service';
import { of } from 'rxjs';
import { ControlErrorsDirective, FORM_ERRORS } from './control-errors.directive';

describe('ControlErrorsDirective', () => {
  let directive: ControlErrorsDirective;

  const mockControl: any = {
    valueChanges: of('test'),
    errors: null
  };

  const mockViewContainer: any = {
    clear: jest.fn(),
    createEmbeddedView: jest.fn()
  };

  const mockFormSubmit: any = {
    submit$: of(false)
  };

  const mockControlContainer: any = {
    vcr: mockViewContainer
  };

  beforeEach(() => {
    directive = new ControlErrorsDirective(
      mockControl,
      mockViewContainer,
      new DestroyService(),
      FORM_ERRORS,
      mockFormSubmit,
      mockControlContainer
    );
  });

  test('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
