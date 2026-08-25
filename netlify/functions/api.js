const serverless = require("serverless-http");
const app = require("../../app");

const serverlessHandler = serverless(app);

module.exports.handler = async (event, context) => {
	const functionPrefix = "/.netlify/functions/api";
	const path = event.path.startsWith(functionPrefix)
		? event.path.slice(functionPrefix.length) || "/"
		: event.path;

	return serverlessHandler({
		...event,
		path,
		requestContext: event.requestContext || {
			identity: { sourceIp: event.headers?.["x-forwarded-for"] || "" }
		}
	}, context);
};
