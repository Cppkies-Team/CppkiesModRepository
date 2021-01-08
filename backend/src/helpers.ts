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

/**
 * Converts a js date to a database timestamp
 * @param time The date to convert, if not supplied, gets current date
 */
export function toDatabaseTimestamp(time?: Date): string {
	return (time ?? new Date())
		.toISOString()
		.replace("T", " ")
		.replace(/\.\d{3}/, "")
}
