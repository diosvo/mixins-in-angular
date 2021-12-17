import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertModule } from '@lib/components/alert/alert.module';
import { CustomInputModule } from '@lib/components/custom-input/custom-input.module';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';
import { UnsavedFormComponent } from './unsaved-form.component';

describe.skip('UnsavedFormComponent', () => {
  let component: UnsavedFormComponent;
  let fixture: ComponentFixture<UnsavedFormComponent>;

  beforeEach(waitForAsync(async () => {
    TestBed.configureTestingModule({
      declarations: [UnsavedFormComponent],
      imports: [
        AlertModule,
        CustomInputModule,

        ReactiveFormsModule,
        RouterTestingModule,

        MatButtonModule,
      ],
      providers: [SnackbarService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsavedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
