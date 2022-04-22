import { FormBuilder } from '@angular/forms';
import { EComponentUI } from '@home/models/url.enum';
import { of } from 'rxjs';
import { ListComponentUiComponent } from './list-component-ui.component';

const groupList = Object.values(EComponentUI);

const DEFAULT_FILTER = {
  query: '',
  group: groupList
};

describe('ListComponentUiComponent', () => {
  let component: ListComponentUiComponent;

  const mockService: any = {
    uiComponentsList$: of([])
  };

  beforeEach(() => {
    component = new ListComponentUiComponent(new FormBuilder(), mockService);
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('ngOnInit()', () => {
    jest.spyOn(component as any, 'onFilters');
    component.ngOnInit();
    expect(component['onFilters']).toBeCalled();
  });

  test('cleanFilters()', () => {
    jest.spyOn(component.componentsForm, 'setValue');
    component.cleanFilters();
    expect(component.componentsForm.setValue).toBeCalledWith(DEFAULT_FILTER);
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
