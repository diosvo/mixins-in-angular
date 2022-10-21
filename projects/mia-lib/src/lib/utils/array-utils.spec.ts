import { User } from '@lib/services/json-placeholder/users/user-service.model';
import { MOCK_EXTENDED_USER, MOCK_LIST_USERS, MOCK_USER } from '@lib/services/json-placeholder/users/user.mock';
import { diff, diffBy, hasDuplicates, union, unionBy } from './array-utils';

describe('./array-utils', () => {
  test('hasDuplicates()', () => {
    expect(hasDuplicates([1, 1, 2, 3, 1])).toBe(true);
  });

  test('diff()', () => {
    expect(diff([1, 2], [1])).toEqual([2]);
  });

  test('diffBy()', () => {
    expect(diffBy(MOCK_LIST_USERS, [MOCK_USER], 'id')).toEqual([MOCK_EXTENDED_USER]);
  });

  test('union()', () => {
    expect(union([2, 1], [1])).toEqual([2, 1]);
  });

  test('unionBy()', () => {
    const USER: User = {
      ...MOCK_EXTENDED_USER,
      firstName: 'Any'
    };
    expect(unionBy(MOCK_LIST_USERS, [USER], 'id')).toEqual([MOCK_USER, USER]);
  });
});