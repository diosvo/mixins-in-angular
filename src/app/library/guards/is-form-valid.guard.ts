import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseFormComponent } from '../models/base-form-component';

@Injectable({
  providedIn: 'root'
})
export class IsFormValidGuard implements CanDeactivate<BaseFormComponent> {
  canDeactivate(
    component: BaseFormComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.isFormValid() ? true : window.confirm('You have unsaved changes. Do you want to continue?');
  }
}
