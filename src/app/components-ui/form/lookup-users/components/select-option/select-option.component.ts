import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { fromEvent, map, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-select-option',
  templateUrl: './select-option.component.html'
})
export class SelectOptionComponent implements OnInit {

  @Input() value: string;
  @Output() readonly emitValue = new EventEmitter<string>();
  click$: Observable<string>;

  constructor(private readonly host: ElementRef) { }

  ngOnInit(): void {
    this.click$ = fromEvent(this.host.nativeElement, 'click').pipe(
      map(() => this.value),
      tap(() => this.emitValue.emit(this.value))
    );
  }
}
