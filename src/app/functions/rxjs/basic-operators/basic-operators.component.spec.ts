import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BasicOperatorsComponent } from './basic-operators.component';

describe('BasicOperatorsComponent', () => {
  let component: BasicOperatorsComponent;
  let fixture: ComponentFixture<BasicOperatorsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BasicOperatorsComponent],
      imports: [
        MatButtonModule,
        MatTooltipModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicOperatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
