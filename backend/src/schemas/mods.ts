export interface AddModSchemaInterface {
	keyname: string
	name: string
	description: string
}

export const AddModSchema = {
	type: "object",
	properties: {
		keyname: {
			type: "string",
		},
		name: {
			type: "string",
		},
		description: {
			type: "string",
		},
	},
	required: ["keyname", "name", "description"],
	additionalProperties: false,
}

export interface QueryModSchemaInterface {
	keyname?: string
	name?: string
}

export const QueryModSchema = {
	id: "QueryModSchemaInterface",
	type: "object",
	properties: {
		keyname: {
			type: "string",
		},
		name: {
			type: "string",
		},
	},
	additionalProperties: false,
}
