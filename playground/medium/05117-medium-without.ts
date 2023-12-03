/*
  5117 - Without
  -------
  by Pineapple (@Pineapple0919) #medium #union #array

  ### Question

  Implement the type version of Lodash.without, Without<T, U> takes an Array T, number or array U and returns an Array without the elements of U.

  ```ts
  type Res = Without<[1, 2], 1>; // expected to be [2]
  type Res1 = Without<[1, 2, 4, 1, 5], [1, 2]>; // expected to be [4, 5]
  type Res2 = Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>; // expected to be []
  ```

  > View on GitHub: https://tsch.js.org/5117
*/

/* _____________ Your Code Here _____________ */

type Included<X extends number, Y extends number | number[]> = Y extends number
	? Equal<X, Y>
	: Y extends number[]
	? X extends Y[number]
		? true
		: false
	: false

type Without<T extends number[], U extends number | number[]> = T extends [
	infer H extends number,
	...infer R extends number[]
]
	? Included<H, U> extends false
		? [H, ...Without<R, U>]
		: [...Without<R, U>]
	: T

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils"

let x: Without<[1, 2], 1>

type cases = [
	Expect<Equal<Without<[1, 2], 1>, [2]>>,
	Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
	Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/5117/answer
  > View solutions: https://tsch.js.org/5117/solutions
  > More Challenges: https://tsch.js.org
*/
