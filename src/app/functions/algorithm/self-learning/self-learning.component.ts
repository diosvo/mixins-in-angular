import { Component } from '@angular/core';

@Component({
  selector: 'algorithm-self-learning',
  templateUrl: './self-learning.component.html',
  styleUrls: ['./self-learning.component.scss']
})
export class SelfLearningComponent {

  numbers = [1, 5, 4, 2, 3];

  nested = [10, [12, 14, [1], [16, [20]]], 10, 11];
  nestedSum = 0;
  factorialCount = 0;

  /**
   * @iterative_sorts
   */

  bubbleSort(numbers: Array<number>): Array<number> {
    let swapped = false;

    do {
      swapped = false;
      for (let idx = 0; idx < numbers.length; idx++) {
        // if the prev numb is larger than next numb, swap it
        if (numbers[idx] > numbers[idx + 1]) {
          const temp = numbers[idx];
          numbers[idx] = numbers[idx + 1];
          numbers[idx + 1] = temp;
          swapped = true;
        }
      }
    } while (swapped === true);

    return numbers;
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
   * @recursion_sorts
   * @advantage defining problem into smaller versions of the same problem
   */

  /**
   * @description takes all the numbers in the array and adds them together.
   */

  nestedArray(array: Array<any>): number {
    let sum = 0;
    for (let idx = 0; idx < array.length; idx++) {
      const current = array[idx];

      if (Array.isArray(current)) {  // check current is still array
        sum += this.nestedArray(current);
      } else {
        sum += current;
      }
    }

    this.nestedSum = sum;
    return sum;
  }

  /**
   * @description n!
   */

  factorial(number: number): number {
    if (number < 2) return 1;
    return this.factorialCount = number * this.factorial(number - 1);
  }

  /**
   * @description takes those two smaller sorted lists and combine them back into one larger.
   */

  mergeSort(numbers: Array<number>): Array<number> {
    if (numbers.length < 2) {
      return numbers;
    }

    // break into two smaller arrays
    const length = numbers.length;
    const middle = Math.floor(length / 2);
    const left = numbers.slice(0, middle);
    const right = numbers.slice(middle);

    return this.numbers = this.merge(this.mergeSort(left), this.mergeSort(right));
  }

  private merge(left: Array<number>, right: Array<number>): Array<number> {
    const results = [];

    while (left.length && right.length) {
      if (left[0] <= right[0]) {
        results.push(left.shift());
      } else {
        results.push(right.shift());
      }
    }

    return results.concat(left, right);
  }

  /**
   * @description the last element in the list and call that the "pivot"
   */

  quickSort(numbers: Array<number>): Array<number> {
    if (numbers.length <= 1) return numbers;

    const pivot = numbers[numbers.length - 1];

    const left = [];
    const right = [];

    for (let idx = 0; idx < numbers.length - 1; idx++) {
      if (numbers[idx] < pivot) {
        left.push(numbers[idx]);
      } else {
        right.push(numbers[idx]);
      }
    }

    // const sortedLeft = this.quickSort(left);
    // const sortedRight = this.quickSort(right);

    // return sortedLeft.concat(pivot, sortedRight);

    return this.numbers = [...this.quickSort(left), pivot, ...this.quickSort(right)];
  }


  /**
   * @non_comparison_sorts
   */

  /**
   * @description the order of the numbers based on asking the question is this element bigger than 
   * That one over-and-over again until numbers are in order and the rest of the algorithm is just optimizing.
   */

  radixSort(numbers: Array<number>): Array<number> {
    // find longest number
    const longestNumber = this.getLongestNumber(numbers);

    // create buckets:  an array of 10 arrays
    const buckets = new Array(10).fill(0).map(() => []);

    // while loop => enqueue the numbers into their buckets
    for (let idx = longestNumber - 1; idx >= 0; idx--) {
      while (numbers.length) {
        const current = numbers.shift();
        buckets[this.getDigit(current, idx, longestNumber)].push(current);
      }

      // dequeue all of the items out of the bucket 
      for (let j = 0; j < buckets.length; j++) {
        while (buckets[j].length) {
          numbers.push(buckets[j].shift());
        }
      }
    }

    return this.numbers = numbers;
  }

  private getDigit(number: number, place: number, longestNumber: number): string | number {
    //  number = 1391, place = 0, longestNumber = 4 => returns 1
    const string = number.toString();
    const size = string.length;
    const mod = longestNumber - size;

    return string[place - mod] || 0;
  }

  private getLongestNumber(numbers: Array<number>): number {
    let longest = 0;

    for (let idx = 0; idx < numbers.length; idx++) {
      const currentLength = numbers[idx].toString().length;
      longest = currentLength > longest ? currentLength : longest;
    }

    return longest;
  }

  /**
   * @binary_search
   */

  /**
   * @description Keeps cutting the half until eventually landing on the item I'm looking for
   */

  linearSearch(id: number, array: Array<any>): void {
    for (let idx = 0; idx < array.length; idx++) {
      if(id === array[idx].id) {
        return array[idx];
      }
    }

    return undefined;
  }

  /* binarySearch(id: string, array: Array<unknown>) {

  } */
}