## Favourites

This file contains all my favourite questions, which seem to me to have the most practical usage.

### [`Chainable Options`](../playground/medium/00012-medium-chainable-options.ts)

```ts
type Chainable<T = {}> = {
	option<K extends string, V>(
		key: K extends keyof T ? never : K,
		value: V
	): Chainable<Omit<T, K> & Record<K, V>>
	get(): T
}
```

This solution has multiple levels of ingenuity encapsulated in it, which I wouldn't have been able to guess or piece togther myself. Let's break it down:

- First, we set the type to be `T` of the `get` function, and initialise the parameter `T` to `{}` in the declaration.
- The return signature of `option` is very cool indeed. Each time the same is called, we return the recursive `Chainable` type itself, but intialized with differnent properties so that the autocomplete keeps on getting aware about all the updates to the properties.
- We add validation of the type of the `key` with parameter `K` by setting it to `never` if it already exists in the keys of `T`. This on hovering would give compiler error `Type XYZ is not assignable to never`.
- Finally, while returning, we make use of the `Record` type to all a object property with `K` (which is a string literal) and type `V` of the value. We make sure to use `Omit` to allow re-writing of the key type (The Typescript Compiler doesn't stop after throwing an error! The string literal type key `K` still passes through the complete cycle).

### `String Manipulation`

This has got to be one of my favourite type of questions from all Type challenges, because they are soo easy to get hang of, and yet they are so powerful! I have solved a couple of these, and yet I can't believe how satisfying it is to perform these Regex like operations with some simple types!

Perhaps the best way to learn them is to see them in action:

<details>
  <summary>Sample Problems</summary>

- [`Trim Left`](../playground/medium/00106-medium-trim-left.ts)
- [`Trim`](../playground/medium/00108-medium-trim-right.ts)
- [`Capitalize`](../playground/medium/00110-medium-capitalize.ts)
- [`Replace`](../playground/medium/00116-medium-replace.ts)
- [`Replace All`](../playground/medium/00119-medium-replaceall.ts)
- [`Drop Char`](../playground/medium/02070-medium-drop-char.ts)
- [`Starts With`](../playground/medium/02688-medium-startswith.ts)
- [`Ends With`](../playground/medium/02693-medium-endswith.ts)
</details>
<br>

All of them rely on some simple facts:

- You can use `extends` with `strings` to compare them to other strings and use `infer` and `any` keywords to pattern match.
- You can use builtin mappers like `Uppercase`, `Lowercase` and `Capitalize` to modify these types.

In addition to being super awesome and fun to play with, the most relevant use case of them stems when they are used with mapped types. This ability to manipulate property names with the `as` keyword is very frequently used in library code to generate types!

A very simple (yet practical) example of the same might be generating the types for `getters` and `setters` of all the `keys` or `properties` a type or interface may have, so that the same be used to type guard a class that consumes the aforementioned object!

### Cartesian Product

Union type's when directly combined, result in the generation of "cartesian products".

```ts
type C = "x" | "y"
type N = "1" | "2"
type Points = `${C}${N}` // Points = 'x1' | 'x2' | 'y1' | 'y2'
```

You can use other builtin mappers as discussed in [the section above](#string-manipulation) to customise the types of strings before taking the cartesian product!

Similarly, it want to the take the cartesian product of two tuples `A` and `B`, then you can do so by simply converting them to union types, and then joining them back!

```ts
type Cartesian<A extends any[], B extends any[]> = A extends A
	? B extends B
		? [A, B]
		: never
	: never
```

### Array.reduce in Typescript?

Sometimes to even loop over the different strings (or tuples) in Typescript, you need to leverage the `Array.reduce` kind of thinking. The simplest way to do so is with the help of the introduction of a "collector" type parameter `X`, which can be initialized to a blank array `[]`. Then in each iteration of the loop, you can get the first element of the tuple or the string using matching and `infer`, and then apply the operation recursively to the rest of the part and add the first element to the `X` tuple with the help of destructing!

The `[...X]` syntax and recursion with an additional type parameter will be your best friend when you want to loop over types! It might feel wierd (beacause it is!), but when you ponder the kind of stuff you are doing with a language that by no means was meant for "programming", the wierdness feels more magical!
