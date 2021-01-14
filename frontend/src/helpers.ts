/**
 * A typed version of `hasOwnProperty`
 * @helper
 */
export function hasOwnProperty<O extends object, K extends PropertyKey>(
	obj: O,
	key: K
): obj is O & Record<K, unknown> {
	// eslint-disable-next-line no-prototype-builtins
	return obj.hasOwnProperty(key)
}

export type CoolReturnType<
	T extends
		| ((...args: unknown[]) => unknown)
		| (new (...args: unknown[]) => unknown)
> = T extends
	| ((...args: unknown[]) => infer R)
	| (new (...args: unknown[]) => infer R)
	? R
	: never
