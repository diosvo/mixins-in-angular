import { HttpClientModule } from '@angular/common/http';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthModule } from '@auth/auth.module';
import { AlertComponent } from '@lib/components/alert/alert.component';
import { of } from 'rxjs';
import { ListFunctionsComponent } from './list-functions.component';

describe.skip('ListFunctionsComponent', () => {
  let component: ListFunctionsComponent;

  const route = {
    queryParams: of({ group: 'rxjs', query: '' })
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ListFunctionsComponent],
      imports: [
        AuthModule,
        AlertComponent,

        HttpClientModule,
        ReactiveFormsModule,
        RouterTestingModule,

        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatProgressBarModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: route
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    // component = new ListFunctionsComponent();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
