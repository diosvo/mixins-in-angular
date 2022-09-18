
type Invalid<T> = Error & { _errorMessage: T };

type Narrowable =
  | string
  | number
  | boolean
  | object
  | null
  | undefined
  | symbol;

type UniqueArray<
  A extends ReadonlyArray<Narrowable>,
  B extends ReadonlyArray<Narrowable>
  > = {
    [I in keyof A]: Narrowable extends {
      [J in keyof B]: J extends I
      ? never
      : B[J] extends A[I]
      ? Narrowable
      : never
    }[number]
    ? Invalid<[A[I], 'is repeated']>
    : A[I]
  }

const asUniqueArray = <
  N extends Narrowable,
  A extends [] | ReadonlyArray<N> & UniqueArray<A, A>
>(array: A) => array;

// type UniqueArray<N extends Narrowable,   A extends [] | ReadonlyArray<N> & UniqueArray<A, A>> =

export { UniqueArray, asUniqueArray };

