# Typescript Notes

### Keywords

- `extends`: Used to form a conditional type. `T extends S` evaluates to `true` only if the type `T` has all the features (methods and properties) provided by the type `S`.
- `keyof`: Used to get a union of all the property names (keys) of a dictionary
- `in`: Used to the "loop" over union type
- `readonly`: If used as an access modifier on a key, then that key would become read only and can not be reassigned.
- `as const`: Used to convert a type to `literal` type, preventing the same to be reasigned

### Built In Types

- `Pick <T, S>`: S must extend the keys of `T`. Used to choose only the properties specified by the type `S` from the dictionary type `T`
- `Readonly<T>`: Makes all the properties of `T` readonly. It is a `shallow` operation, that it if any property of `T` is an object itself, then that object would not have it's properties as read only.

### Helpful Tricks

- `"Looping" over an tuple`: You can use `P in T[number]` as a mapped type to loop over `T` if it extends `any[]` to get `P` (values of the tuple).
- You can get the `length of an array` as `T["length"]`.
- `Functions` with any number of arguments can be modelled with the help of the type expression `(...args: any[]) => void`
- Using `destructing` with arrays to as `[infer R, ...any[]]` is a common method to get the first and last elements of an array.
