import { Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService, AuthUser } from '@auth/services/auth.service';
import isEqual from 'lodash.isequal';

export enum LogicalOperator {
  OR = 'OR',
  AND = 'AND',
}

type Operator = `${Uppercase<LogicalOperator>}`;


/**
 * @description The view is hidden if the user does not have the corresponding permission/s.
 * @usageNotes *hasPermission="['Customer', 'Guest']; op 'OR'"; default op is AND.
 */

@Directive({
  selector: '[hasPermission]',
  standalone: true
})
export class HasPermissionDirective implements OnInit {

  @Input()
  set hasPermission(value: string[]) {
    this._permissions = value;
    this.updateView();
  }

  @Input()
  set hasPermissionOp(operator: Operator) { // prefixed with the name of directive
    this._logicalOperator = operator;
    this.updateView();
  }

  private _currentUser: AuthUser;
  private _permissions: string[] = [];

  private _logicalOperator: Operator = LogicalOperator.AND;
  private _isHidden = true;

  constructor(
    private readonly authService: AuthService,
    private readonly viewContainer: ViewContainerRef,
    private readonly templateRef: TemplateRef<ElementRef>,
  ) { }

  ngOnInit(): void {
    this._currentUser = this.authService.user;
    this.updateView();
  }

  private updateView(): void {
    if (this.checkPermission()) {
      if (this._isHidden) { // keep track of whether we’ve already added the template into the DOM
        this.viewContainer.createEmbeddedView(this.templateRef);
        this._isHidden = false;
      }
    } else {
      this._isHidden = true;
      this.viewContainer.clear();
    }
  }

  private checkPermission(): boolean {
    let hasPermission = false;

    if (this._currentUser && this._currentUser.roles) {
      for (const checkPermission of this._permissions) {
        const permissionFound = this._currentUser.roles.find(
          (permission: string) => isEqual(permission.toLowerCase(), checkPermission.toLowerCase())
        );

        if (permissionFound) {
          hasPermission = true;

          if (isEqual(this._logicalOperator, LogicalOperator.OR)) {
            break;
          }
        } else {
          hasPermission = false;

          if (isEqual(this._logicalOperator, LogicalOperator.AND)) {
            break;
          }
        }
      }
    }

    return hasPermission;
  }
}
