import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { fromEvent, mapTo, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-select-option',
  templateUrl: './select-option.component.html'
})
export class SelectOptionComponent implements OnInit {

  @Input() value: string;
  @Output() emitValue = new EventEmitter<string>();
  click$: Observable<string>;

  constructor(private readonly host: ElementRef) { }

  ngOnInit(): void {
    this.click$ = fromEvent(this.host.nativeElement, 'click').pipe(
      mapTo(this.value),
      tap(() => this.emitValue.emit(this.value))
    );
  }
}
