import { deepFlatten, sortBy } from './array-utils';

describe('./array-utils', () => {
  test('deepFlatten() to flat nested array', () => {
    expect(deepFlatten([1, 2, [3, 4]])).toEqual([1, 2, 3, 4]);
    expect(deepFlatten([[1, [2]], [3, 4]])).toEqual([1, 2, 3, 4]);
  });

  test('sortBy() to sort array by key', () => {
    const users = [
      { name: 'Vo' },
      { name: 'Dios' }
    ];
    expect(sortBy(users, 'name')).toEqual([
      { name: 'Dios' },
      { name: 'Vo' }
    ]);
  });
});