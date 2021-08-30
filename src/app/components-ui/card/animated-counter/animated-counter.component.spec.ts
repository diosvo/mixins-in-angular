import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnimatedCounterComponent } from './animated-counter.component';
import { AnimatedCounterDirective } from './animated-counter.directive';

describe('AnimatedCounterComponent', () => {
  let component: AnimatedCounterComponent;
  let fixture: ComponentFixture<AnimatedCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimatedCounterComponent, AnimatedCounterDirective]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatedCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
