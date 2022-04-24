import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { GithubIssue } from '../../models/service.model';
import { DataTableComponent } from './data-table.component';

describe('DataTableComponent', () => {
  let component: DataTableComponent;

  const mockService: any = {
    getRepoIssues: jest.fn().mockReturnValue(of([]))
  };

  beforeEach(() => {
    component = new DataTableComponent(new FormBuilder(), mockService);
    component['_pageIndex$'].next(0);
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('ngOnInit()', () => {
    jest.spyOn(component as any, 'getIssues');
    component.ngOnInit();
    expect(component['getIssues']).toBeCalled();
  });

  describe('getIssues()', () => {
    test('should return empty data when no data found', () => {
      component['getIssues']();
      component.issues$.subscribe((response: GithubIssue[]) => {
        expect(response).toEqual([]);
      });
    });

    test('should return filtered data when the filters changes', (done) => {
      component.filterForm = new FormGroup({
        query: new FormControl(''),
        state: new FormControl(['open'])
      });
      mockService.getRepoIssues.mockReturnValue(of({
        total_count: 2,
        items: [
          {
            id: 1,
            number: 24819,
            state: 'open',
            title: 'chore: CodeQL Action'
          },
          {
            id: 2,
            number: 24819,
            state: 'closed',
            title: 'feat(cdk/menu): move experimental CDK menu into stable'
          }
        ]
      }));

      component['getIssues']();
      component.issues$.subscribe((response: GithubIssue[]) => {
        expect(response).toEqual([
          {
            id: 1,
            number: 24819,
            state: 'open',
            title: 'chore: CodeQL Action'
          }
        ]);
        done();
      });
    });

    test('should return error message when api returns fail', () => {
      mockService.getRepoIssues.mockReturnValue(throwError(() => new Error('Bad Request')));
      jest.spyOn(component['errorMessage$'], 'next');

      component['getIssues']();
      component.issues$.subscribe(() => {
        expect(component['errorMessage$'].next).toBeCalledWith('Bad Request');
      });
    });
  });

  test('pageChanges()', () => {
    const page = { pageIndex: 1 } as any;
    jest.spyOn(component['_pageIndex$'], 'next');

    component.pageChanges(page);
    expect(component['_pageIndex$'].next).toBeCalledWith(page.pageIndex);
  });
});
