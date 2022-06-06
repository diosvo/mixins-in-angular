import { FormBuilder } from '@angular/forms';
import { IGroupValue } from '@home/models/search.model';
import { EUrl } from '@home/models/url.enum';
import { of } from 'rxjs';
import { ListComponentUiComponent } from './list-component-ui.component';

const DEFAULT_FILTER = {
  query: '',
  group: []
};

const list: IGroupValue[] = [
  {
    groupName: 'button',
    groupDetails: [
      {
        name: 'Button 1',
        route: '/button-1',
        description: ''

      }
    ],
    groupUrl: EUrl.COMPONENT
  }
];

describe('ListComponentUiComponent', () => {
  let component: ListComponentUiComponent;

  const mockService: any = {
    uiComponentsList$: of(list)
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

  describe('onFilters()', () => {
    test('should filter data if it matches with filter collection', (done) => {
      component.componentsForm.patchValue({ group: ['button'] });
      component['onFilters']();
      component.filteredData$.subscribe((response: IGroupValue[]) => {
        expect(response).toEqual(list);
        done();
      });
    });

    test('should retrieve data by group if the parent checkbox is unchecked', (done) => {
      component.componentsForm.patchValue({ group: [] });
      component['onFilters']();
      component.filteredData$.subscribe((response: IGroupValue[]) => {
        expect(response).toEqual(list);
        done();
      });
    });

    test('returns empty data if it does not match with filter collection', (done) => {
      component.componentsForm.patchValue({ group: ['card'] });
      component['onFilters']();
      component.filteredData$.subscribe((response: IGroupValue[]) => {
        expect(response).toEqual([]);
        done();
      });
    });
  });

  test('cleanFilters()', () => {
    jest.spyOn(component.componentsForm, 'setValue');
    component.cleanFilters();
    expect(component.componentsForm.setValue).toBeCalledWith(DEFAULT_FILTER);
  });

  describe('clearAllIconActive()', () => {
    test('should hide clear all icon if group is all and query is empty value', () => {
      component.group.setValue(DEFAULT_FILTER.group);
      component.query.setValue(DEFAULT_FILTER.query);
      expect(component.clearAllIconActive()).toBe(false);
    });

    test('should show clear all icon if query has value and group is not all selected', () => {
      component.group.setValue(['button']);
      component.query.setValue('test');
      expect(component.clearAllIconActive()).toBe(true);
    });
  });
});
