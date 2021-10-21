import { Component } from '@angular/core';

@Component({
  selector: 'app-self-learning',
  templateUrl: './self-learning.component.html',
  styleUrls: ['./self-learning.component.scss']
})
export class SelfLearningComponent {

  numbers = [1, 5, 4, 2, 3];
  nested = [10, [12, 14, [1], [16, [20]]], 10, 11];
  nestedSum = 0;

  /**
   * @iterative_sorts
   */

  bubbleSort(numbers: Array<number>): Array<number> {
    for (let idx = 0; idx < numbers.length; idx++) {
      // if the prev numb is larger than next numb, swap it
      if (numbers[idx] > numbers[idx + 1]) {
        const temp = numbers[idx];
        numbers[idx] = numbers[idx + 1];
        numbers[idx + 1] = temp;
      }

      return numbers;
    }
  }

  /**
   * @advantage conceptualize & more useful in general algorithm
   * @description start by index 0 -> sorted; everything after unsorted.
   */

  insertionSort(numbers: Array<number>): Array<number> {
    for (let idx = 1; idx < numbers.length; idx++) {
      let numberToInsert = numbers[idx]; // number is gonna be comparing
      let trackIdx; // the inner counter

      for (trackIdx = idx - 1; numbers[trackIdx] > numberToInsert && trackIdx >= 0; trackIdx--) {
        numbers[trackIdx + 1] = numbers[trackIdx]; // move numbers to the right until find where to insert
      }

      numbers[trackIdx + 1] = numberToInsert; // do the insertion
    }

    return numbers;
  }

  /**
   * @recursion
   * @advantage defining problem into smaller versions of the same problem
   */

  /**
   * @description takes all the numbers in the array and adds them together.
   */

  nestedArray(array: Array<any>): number {
    let sum = 0;
    for (let idx = 0; idx < array.length; idx++) {
      const current = array[idx];

      // check current is still array
      if (Array.isArray(current)) {
        sum += this.nestedArray(current);
      } else {
        sum += current;
      }
    }

    this.nestedSum = sum;
    return sum;
  }
}