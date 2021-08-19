import { Component, OnInit } from '@angular/core';

@Component({
  selector: '<button mat-button></button>',
  template: `
    <p>
      mia-lib works!
    </p>
  `,
  styles: [
  ]
})
export class MiaLibComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
