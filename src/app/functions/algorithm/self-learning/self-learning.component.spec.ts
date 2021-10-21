import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelfLearningComponent } from './self-learning.component';

describe('SelfLearningComponent', () => {
  let component: SelfLearningComponent;
  let fixture: ComponentFixture<SelfLearningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelfLearningComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfLearningComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Check algorithm: ', () => {
    describe('Iterative Sorts', () => {
      test('bubbleSort()', () => {
        component.bubbleSort([1, 5, 4, 2, 3]);
      });

      test('insertionSort()', () => {
        expect(component.insertionSort([1, 5, 4, 2, 3])).toEqual([1, 2, 3, 4, 5]);
      });
    });

    describe('Recursion', () => {
      test('nestedArray()', () => {
        expect(component.nestedArray([1, 2, 3])).toEqual(6);
        expect(component.nestedArray([1, [2], 3])).toEqual(6);
        expect(component.nestedArray([[[[[[[[[5]]]]]]]]])).toEqual(5);
        expect(component.nestedArray([10, [12, 14, [1], [16, [20]]], 10, 11])).toEqual(94);
      });
    });
  });
});
