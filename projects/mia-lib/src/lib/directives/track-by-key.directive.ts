import { NgForOf } from '@angular/common';
import { Directive, Host, Input, NgModule } from '@angular/core';

@Directive({
  selector: '[ngForTrackByKey]',
})
export class TrackByKeyDirective<T>  {

  @Input('ngForTrackByKey')
  set trackByKey(value: string) {
    this._propertyName = value ?? '';
  }

  private _propertyName: string;

  constructor(@Host() private readonly ngFor: NgForOf<T>) {
    this.ngFor.ngForTrackBy = (_: number, item: T) => this._propertyName ? item[this._propertyName] : item;
  }

}

/**
 * @usageNotes *ngFor="let <item> of <list>; trackByKey: '<key_name>'"
 */

@NgModule({
  declarations: [TrackByKeyDirective],
  exports: [TrackByKeyDirective]
})
export class TrackByKeyDirectiveModule { }
