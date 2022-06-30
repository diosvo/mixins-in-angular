import { Directive, ElementRef, Input, NgModule, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import isEqual from 'lodash.isequal';

export enum LogicalOperator {
  OR = 'OR',
  AND = 'AND',
}

type Operator = `${Uppercase<LogicalOperator>}`;

@Directive({
  selector: '[hasPermission]'
})
export class HasPermissionDirective implements OnInit {

  @Input()
  set hasPermission(value: Array<string>) {
    this._permissions = value;
    this.updateView();
  }

  @Input()
  set hasPermissionOp(operator: Operator) { // prefixed with the name of directive
    this._logicalOperator = operator;
    this.updateView();
  }

  private _currentUser: any;
  private _permissions: Array<string> = [];

  private _logicalOperator: Operator = LogicalOperator.AND;
  private _isHidden = true;

  constructor(
    private readonly authService: AuthService,
    private readonly viewContainer: ViewContainerRef,
    private readonly templateRef: TemplateRef<ElementRef>,
  ) { }

  ngOnInit(): void {
    this._currentUser = {
      ...this.authService.user,
      roles: [] // need works
    };
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
        const permissionFound = this._currentUser.roles.find(permission => isEqual(permission.toLowerCase(), checkPermission.toLowerCase()));

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

/**
 * @description The view is hidden if we don't have the corresponding permission.
 * @usageNotes *hasPermission="['Customer', 'Guest']; op 'OR'"; default op is AND.
 */

@NgModule({
  declarations: [HasPermissionDirective],
  exports: [HasPermissionDirective],
})
export class HasPermissionDirectiveModule { }
