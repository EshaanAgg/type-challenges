## Favourites

This file contains all my favourite questions, which seem to me to have the most practical usage.

1. [Chainable Options](../playground/medium/00012-medium-chainable-options.ts)

```
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
- Finally, while returning, we make use of the `Record` type to all a object property with `K` (which is a string literal) and type `V` of the value. We make sure to use `Omit` to allow re-writing of the key type (The Typescript Compiler doesn't stop after throwing an error! The string literal type key `K` still passes through the complete cycle.)
