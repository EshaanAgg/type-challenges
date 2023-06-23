# Typescript Notes

### Keywords

- `extends`: Used to form a conditional type. `T extends S` evaluates to `true` only if the type `T` has all the features (methods and properties) provided by the type `S`.
- `keyof`: Used to get a union of all the property names (keys) of a dictionary.
- `in`: Used to the "loop" over union type
- `readonly`:
  - If used as an access modifier on a key, then that key would become read only and can not be reassigned.
  - `Tuples` extend `readonly any[]`.
- `as const`: Used to convert a type to `literal` type, preventing the same to be reasigned
- `_` is the common placeholder used across Typescript for variables whose values are not needed.

### Built In Types

##### Commonly Used

- `Pick <T, S>`: S must extend the keys of `T`. Used to choose only the properties specified by the type `S` from the dictionary type `T`
- `Omit<T,K>`: Constructs a type by picking all properties from `T` and then removing `K`
- `Exclude<T,S>`: Exclude the properties if `S` from `T`
- `Readonly<T>`: Makes all the properties of `T` readonly. It is a `shallow` operation, that it if any property of `T` is an object itself, then that object would not have it's properties as read only.
- `Function` can be used as an interface with `extends`.

##### Others

- `Awaited<T>`: Used to get the return type of a `Promise` or a chain of `nested promises`.
- `ReturnType<fn>`: Returns the return type of any function.

### Helpful Tricks

- `"Looping" over an tuple`: You can use `P in T[number]` as a mapped type to loop over `T` if it extends `any[]` to get `P` (values of the tuple).
- You can get the `length of an array` as `T["length"]`.
- `Functions` with any number of arguments can be modelled with the help of the type expression `(...args: any[]) => void`
- Using `destructuring` with arrays to as `[infer R, ...any[]]` is a common method to get the first and last elements of an array.
- `Distributed Conditional Types`
  - Naked types can be automatically distributed over unions during intialization.
  - For example, `T extends U ? X : Y` with the type argument `A | B | C` for `T` is resolved as `(A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y)`
- If you want Typescript to throw errors in any assertion, then you must be validate them using `extends` in the type parameter definition itself.
- It is a common practice to use `recursion` in definition of types.
- You can make some parameters optional by specifying a default value for them.
  - For example: `type test: <T, K = keyof T> .....`

### Good Practices

- Use `never` in types with `extend` if you are assured that the particular branch of the code is unreachable. This is important to ensure exhaustive conditions.

### Dummy Mistakes I Always Trip On

- If you are declaring a type parameter, let's say `type X<T extends (...args: any[]) => any>`, then you can't use the use the `infer` keyboard in the param definition itself. You can only use it on the `RHS` with another `extends` clause with the same definiton.

### Random Explorations

- This test suite uses the `Equal` type with the following definiton:

```ts
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
	? true
	: false
```

It relies on conditional types being deferred when `T` is not known. Assignability of deferred conditional types relies on an internal `isTypeIdenticalTo` check.
