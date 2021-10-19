import { Component } from '@angular/core';

@Component({
  selector: 'app-self-learning',
  templateUrl: './self-learning.component.html',
  styleUrls: ['./self-learning.component.scss']
})
export class SelfLearningComponent {

  numbers = [1, 5, 4, 2, 3];

  constructor() { }

  bubbleSort(numbers: Array<number>): void {
    for (let idx = 0; idx < numbers.length; idx++) {
      /* if the prev numb is greater than next numb, swap it */
      if (numbers[idx] > numbers[idx + 1]) {
        const temp = numbers[idx];
        numbers[idx] = numbers[idx + 1];
        numbers[idx + 1] = temp;
      }
    }
  }
}
