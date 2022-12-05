import { MOCK_LIST_USERS, MOCK_USER } from '@lib/mocks/json-placeholder/user.mock';
import { User } from '@lib/models/json-placeholder/user.model';
import { diff, diffBy, hasDuplicates, union, unionBy } from './array-utils';

describe('./array-utils', () => {
  test('hasDuplicates()', () => {
    expect(hasDuplicates([1, 1, 2, 3, 1])).toBe(true);
  });

  test('diff()', () => {
    expect(diff([1, 2], [1])).toEqual([2]);
  });

  test('diffBy()', () => {
    expect(diffBy(MOCK_LIST_USERS, [MOCK_USER], 'id')).toEqual([MOCK_USER]);
  });

  test('union()', () => {
    expect(union([2, 1], [1])).toEqual([2, 1]);
  });

  test('unionBy()', () => {
    const USER: User = {
      ...MOCK_USER,
      username: 'Any'
    };
    expect(unionBy(MOCK_LIST_USERS, [USER], 'id')).toEqual([MOCK_USER, USER]);
  });
});