import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfLearningComponent } from './self-learning.component';

describe('SelfLearningComponent', () => {
  let component: SelfLearningComponent;
  let fixture: ComponentFixture<SelfLearningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfLearningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
