import { Directive, Input, NgModule, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthUser } from '@auth/models/auth.model';
import { AuthService } from '@auth/services/auth.service';

enum LogicalOperator {
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

  private _currentUser: AuthUser;
  private _permissions: Array<string> = new Array();

  private _logicalOperator: Operator = LogicalOperator.AND;
  private _isHidden = true;

  constructor(
    private readonly authService: AuthService,
    private readonly templateRef: TemplateRef<any>,
    private readonly viewContainer: ViewContainerRef,
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
        const permissionFound = this._currentUser.roles.find(permission => permission.toLowerCase() === checkPermission.toLowerCase());

        if (permissionFound) {
          hasPermission = true;

          if (this._logicalOperator === LogicalOperator.OR) {
            break;
          }
        } else {
          hasPermission = false;

          if (this._logicalOperator === LogicalOperator.AND) {
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
