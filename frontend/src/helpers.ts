export function hasOwnProperty<O extends object, K extends PropertyKey>(
	obj: O,
	key: K
): obj is O & Record<K, unknown> {
	// eslint-disable-next-line no-prototype-builtins
	return obj.hasOwnProperty(key)
}
