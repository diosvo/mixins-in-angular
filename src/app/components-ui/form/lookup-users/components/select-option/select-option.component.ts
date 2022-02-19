import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { fromEvent, mapTo, Observable } from 'rxjs';

@Component({
  selector: 'app-select-option',
  templateUrl: './select-option.component.html'
})
export class SelectOptionComponent implements OnInit {

  @Input() value: string;
  click$: Observable<string>;

  constructor(private readonly host: ElementRef) { }

  ngOnInit(): void {
    this.click$ = fromEvent(this.host.nativeElement, 'click').pipe(
      mapTo(this.value)
    );
  }
}
