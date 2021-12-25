import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SelfLearningComponent } from './self-learning.component';

describe('SelfLearningComponent', () => {
  let component: SelfLearningComponent;
  let fixture: ComponentFixture<SelfLearningComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SelfLearningComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfLearningComponent);
    component = fixture.componentInstance;
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Check algorithm: ', () => {
    describe('Iterative Sorts', () => {
      test('bubbleSort()', () => {
        expect(component.bubbleSort([1, 5, 4, 2, 3])).toEqual([1, 2, 3, 4, 5]);
      });

      test('insertionSort()', () => {
        expect(component.insertionSort([1, 5, 4, 2, 3])).toEqual([1, 2, 3, 4, 5]);
      });
    });

    describe('Recursion Sorts', () => {
      test('nestedArray()', () => {
        expect(component.nestedArray([1, 2, 3])).toEqual(6);
        expect(component.nestedArray([1, [2], 3])).toEqual(6);
        expect(component.nestedArray([[[[[[[[[5]]]]]]]]])).toEqual(5);
        expect(component.nestedArray([10, [12, 14, [1], [16, [20]]], 10, 11])).toEqual(94);
      });

      test('factorial()', () => {
        expect(component.factorial(1)).toEqual(1);
        expect(component.factorial(2)).toEqual(2);
        expect(component.factorial(3)).toEqual(6);
        expect(component.factorial(10)).toEqual(3628800);
      });

      test('mergeSort()', () => {
        expect(component.mergeSort([1, 5, 4, 2, 3])).toEqual([1, 2, 3, 4, 5]);
      });

      test('quickSort()', () => {
        expect(component.quickSort([1, 5, 4, 2, 3])).toEqual([1, 2, 3, 4, 5]);
      });
    });

    describe('Non-Comparison Sorts', () => {
      test('radixSort()', () => {
        expect(component.radixSort([1, 5, 4, 2, 3])).toEqual([1, 2, 3, 4, 5]);
      });
    });

    describe('Search', () => {
      test('linearSearch()', () => {
        const lookingFor = { id: 9, name: 'Dios Vo' };
        expect(component.linearSearch(9, [{ id: 26, name: 'Thu' }, lookingFor])).toBe(lookingFor);
      });
    });
  });
});
