import { InjectableType, ɵComponentType as ComponentType, ɵDirectiveType as DirectiveType } from '@angular/core';

function decorateNgOnDestroy(
  ngOnDestroy: (() => void) | null | undefined
) {
  ngOnDestroy && ngOnDestroy.call(this);
}

function decorateProvider<T>(
  type: InjectableType<T> | DirectiveType<T> | ComponentType<T>
): void {
  type.prototype.ngOnDestroy = decorateNgOnDestroy(type.prototype.ngOnDestroy);
}

export function AutoUnsubscribe(): ClassDecorator {
  return (type: any) => {
    type.prototype.ngOnDestroy = decorateProvider(type);
  };
}