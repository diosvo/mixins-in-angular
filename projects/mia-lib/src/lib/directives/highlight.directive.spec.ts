import { SecurityContext } from '@angular/core';
import { HighlightDirective } from './highlight.directive';

describe('HighlightDirective', () => {
  let directive: HighlightDirective;

  const content = 'test' as const;

  const mockElementRef: any = {
    nativeElement: {
      textContent: content
    }
  };

  const mockSanitizer: any = {
    sanitize: jest.fn().mockReturnValue(content)
  };

  beforeEach(() => {
    directive = new HighlightDirective(mockElementRef, mockSanitizer);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  describe('ngOnChanges()', () => {
    test('do not mark string when no search term is passed in', () => {
      directive.ngOnChanges({ searchTerm: null } as any);
      expect(directive.content).toContain(content);
    });

    describe('should mark the string is matched with passed value', () => {
      test('if there has a sensitive case', () => {
        const changes: any = {
          caseSensitive: {
            currentValue: true
          }
        };
        directive.searchTerm = 'T';
        directive.caseSensitive = true;

        directive.ngOnChanges(changes);
        expect(mockSanitizer.sanitize).toBeCalledWith(
          SecurityContext.HTML,
          content // no matched string
        );
      });

      test('if there has not a sensitive case', () => {
        const changes: any = {
          searchTerm: {
            currentValue: 't'
          }
        };
        directive.searchTerm = 't';

        directive.ngOnChanges(changes);
        expect(mockSanitizer.sanitize).toBeCalledWith(
          SecurityContext.HTML,
          '<mark class="">t</mark>es<mark class="">t</mark>'
        );
      });
    });
  });
});
