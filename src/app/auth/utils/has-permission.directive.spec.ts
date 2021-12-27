import { ERole } from '@lib/models/role';
import { HasPermissionDirective, LogicalOperator } from './has-permission.directive';

describe('HasPermissionDirective', () => {
  let directive: HasPermissionDirective;

  const service = {
    user: {
      username: 'diosvo',
      password: '123456',
      roles: [ERole.ADMIN]
    }
  } as any;

  const templateRef = {} as any;

  const viewContainer = {
    clear: jest.fn(),
    createEmbeddedView: jest.fn()
  } as any;

  test('should create an instance', () => {
    directive = new HasPermissionDirective(service, templateRef, viewContainer);
    expect(directive).toBeTruthy();
  });

  test('set hasPermission', () => {
    jest.spyOn(directive as any, 'updateView');
    directive.hasPermission = [ERole.ADMIN, ERole.CUSTOMER];

    expect(directive['_permissions']).toEqual([ERole.ADMIN, ERole.CUSTOMER]);
    expect(directive['updateView']).toBeCalled();
  });

  describe('set hasPermissionOp when operator is', () => {
    test(LogicalOperator.OR + ' as default', () => {
      jest.spyOn(directive as any, 'updateView');
      directive.hasPermissionOp = LogicalOperator.OR;

      expect(directive['_logicalOperator']).toBe(LogicalOperator.OR);
      expect(directive['updateView']).toBeCalled();
    });

    test(LogicalOperator.AND, () => {
      jest.spyOn(directive as any, 'updateView');
      directive.hasPermissionOp = LogicalOperator.AND;

      expect(directive['_logicalOperator']).toBe(LogicalOperator.AND);
      expect(directive['updateView']).toBeCalled();
    });
  });

  test('ngOnInit() to set up directive', () => {
    jest.spyOn(directive as any, 'updateView');
    directive.ngOnInit();

    expect(directive['_currentUser']).toEqual(service.user);
    expect(directive['updateView']).toBeCalled();
  });

  describe('should call updateView()', () => {
    describe('when user has permission and', () => {
      beforeEach(() => jest.spyOn(directive as any, 'checkPermission').mockReturnValue(true));

      test('template has NOT added; should add view into the DOM', () => {
        directive['_isHidden'] = true;
        directive['updateView']();

        expect(viewContainer.createEmbeddedView).toBeCalledWith(templateRef);
        expect(directive['_isHidden']).toBe(false);
      });

      test('template is already added; should get template from track', () => {
        directive['_isHidden'] = false;
        directive['updateView']();
        expect(directive['updateView']()).toBeUndefined();
      });
    });

    test('when user does NOT have permission; remove view from DOM', () => {
      jest.spyOn(directive as any, 'checkPermission').mockReturnValue(false);

      directive['updateView']();

      expect(directive['_isHidden']).toBe(true);
      expect(viewContainer.clear).toBeCalled();
    });
  });
});