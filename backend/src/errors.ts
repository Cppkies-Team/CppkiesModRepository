import boom from "@hapi/boom"

export class UnexpectedTypeError extends boom.Boom {
	/**
	 * Creates an unexpected type error
	 * @param value
	 * @param expectedType
	 * @param key
	 */
	constructor(value: unknown, expectedType: string, key?: string) {
		super(
			`Unexpected value ${key ? `of key '${key}' with` : "of"} type ${
				value === null ? "null" : typeof value
			}, expected type of ${expectedType}.`,
			{ message: "Bad Request" }
		)
	}
}
