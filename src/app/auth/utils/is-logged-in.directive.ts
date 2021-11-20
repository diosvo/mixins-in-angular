import { NgIf } from '@angular/common';
import { Directive, NgModule, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';

@Directive({
  selector: '[isLoggedIn]'
})
export class IsLoggedInDirective extends NgIf implements OnInit {

  constructor(
    readonly vcr: ViewContainerRef,
    readonly tpl: TemplateRef<any>,
    private readonly authService: AuthService
  ) {
    super(vcr, tpl);
  }

  ngOnInit(): void {
    this.ngIf = this.authService.isLoggedIn;
  }
}

@NgModule({
  declarations: [IsLoggedInDirective],
})
export class IsLoggedInDirectiveModule { }