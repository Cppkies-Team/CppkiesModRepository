import {
	FastifySchema,
	HTTPMethods,
	RawReplyDefaultExpression,
	RawRequestDefaultExpression,
	RawServerDefault,
	RouteHandlerMethod,
	RouteOptions,
} from "fastify"
import { RouteGenericInterface } from "fastify/types/route"
export default class ControllerEndpoint<
	Options extends RouteGenericInterface = {}
> {
	constructor(
		public handler: RouteHandlerMethod<
			RawServerDefault,
			RawRequestDefaultExpression<RawServerDefault>,
			RawReplyDefaultExpression<RawServerDefault>,
			Options
		>,
		public schema?: FastifySchema
	) {}
}

export interface CompleteControllerEndpointAdditionalData {
	url: string
	method: HTTPMethods | HTTPMethods[]
}

export function completeControllerEndpoint<
	Options extends RouteGenericInterface
>(
	endpoint: ControllerEndpoint<Options>,
	additionalData: CompleteControllerEndpointAdditionalData
): RouteOptions<
	RawServerDefault,
	RawRequestDefaultExpression<RawServerDefault>,
	RawReplyDefaultExpression<RawServerDefault>,
	Options
> {
	return {
		handler: endpoint.handler,
		schema: endpoint.schema,
		url: additionalData.url,
		method: additionalData.method,
	}
}
