import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { DataTableComponent } from './data-table.component';

describe('DataTableComponent', () => {
  let component: DataTableComponent;

  const mockService: any = {
    getRepoIssues: jest.fn().mockReturnValue(of([]))
  };

  beforeEach(() => {
    component = new DataTableComponent(new FormBuilder(), mockService);
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
