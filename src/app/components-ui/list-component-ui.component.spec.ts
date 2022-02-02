import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
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
import { AlertModule } from '@lib/components/alert/alert.module';
import { of } from 'rxjs';
import { ListComponentUiComponent } from './list-component-ui.component';

describe('ListComponentUiComponent', () => {
  let component: ListComponentUiComponent;
  let fixture: ComponentFixture<ListComponentUiComponent>;

  const route = {
    queryParams: of({ group: 'button', query: '' })
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ListComponentUiComponent],
      imports: [
        AuthModule,
        AlertModule,

        HttpClientModule,
        ReactiveFormsModule,
        RouterTestingModule,

        MatIconModule,
        MatInputModule,
        MatButtonModule,
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
    fixture = TestBed.createComponent(ListComponentUiComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.spyOn(component, 'ngOnDestroy');
    fixture.destroy();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('ngOnInit()', () => {
    jest.spyOn(component as any, 'watchForQueryParams');
    jest.spyOn(component as any, 'onFilters');

    component.ngOnInit();

    expect(component['watchForQueryParams']).toBeCalled();
    expect(component['onFilters']).toBeCalled();
  });

  describe('watchForQueryParams()', () => {
    beforeEach(() => jest.spyOn(component.componentsForm, 'patchValue'));

    test('should patch value if params are defined', () => {
      component['watchForQueryParams']();
      expect(component.componentsForm.patchValue).toBeCalledWith({ group: 'button', query: '' });
    });

    test('should NOT patch value if params are undefined', () => {
      route.queryParams = of({ group: undefined, query: undefined });
      component['watchForQueryParams']();
      expect(component.componentsForm.patchValue).not.toBeCalled();
    });
  });

  test('updateParams', () => {
    jest.spyOn(component['router'], 'navigate');
    component.updateParams();
    expect(component['router'].navigate).toBeCalledWith([], {
      relativeTo: component['route'],
      queryParams: component.componentsForm.value
    });
  });

  test('cleanFilters()', () => {
    jest.spyOn(component.componentsForm, 'setValue');
    component.cleanFilters();
    expect(component.componentsForm.setValue).toBeCalledWith({ query: '', group: 'all' });
  });

  describe('clearAllIconActive()', () => {
    test('should hide clear all icon if group is all and query is empty value', () => {
      component.group.setValue('all');
      component.query.setValue('');
      expect(component.clearAllIconActive()).toBe(false);
    });

    test('should show clear all icon if group or query has value', () => {
      component.group.setValue('button');
      component.query.setValue('test');
      expect(component.clearAllIconActive()).toBe(true);
    });
  });
});
