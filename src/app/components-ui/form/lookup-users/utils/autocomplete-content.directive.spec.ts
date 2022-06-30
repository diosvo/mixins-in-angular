import { AutocompleteContentDirective } from './autocomplete-content.directive';

describe('AutocompleteContentDirective', () => {
  let directive: AutocompleteContentDirective;

  beforeEach(() => {
    directive = new AutocompleteContentDirective({} as any);
  });

  test('should initialize directive', () => {
    expect(directive).toBeTruthy();
  });
});