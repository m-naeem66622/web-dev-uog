// const { imageCleanup } = require("../utils/imageCleanup.util");
// this middleware takes in input schema and schema scope (body,
// params) and returns a validation function which validates the
// schema upon invocation
/**
 * Validates the request data against the input schema based on the schema scope.
 * @param {object} inputSchema - The input schema to validate against.
 * @param {string} schemaScope - The scope of the schema (BODY, PARAMS, QUERY).
 * @returns {function} - The middleware function to validate the request data.
 */
const validateRequest = (inputSchema, schemaScope) => {
    // defining a method to validate incoming request body data
    const requestBodyValidator = async (req, res, next) => {
        try {
            // validating incoming request body
            if (!Object.keys(req.body).length) {
                // this code runs in case incoming request body is empty

                // returning the response with an error message
                return res.status(400).json({
                    status: "FAILED",
                    message: "Data Validation Failed",
                    error: {
                        error: `Incoming request body can't be empty.`,
                    },
                });
            }

            // validating the incoming schema
            await inputSchema.validateAsync(req.body, {
                abortEarly: false,
                context: { role: req.user?.role },
            });

            // forwarding the request to the next handler
            next();
        } catch (error) {
            // this code runs in case the incoming data's validation fails against
            // defined schema

            // // Images Cleanup in multipart/form if validations failed
            // imageCleanup(req.file?.path);

            let errorDescription = {};
            error.details.map((detail) => {
                let errorKey = detail.context.label;
                let errorMessage = detail.message.replace(/"/g, ``);
                errorDescription[errorKey] = errorMessage;
            });

            // returning the response with an error message
            return res.status(400).json({
                status: "FAILED",
                message: "Data Validation Failed",
                error: errorDescription,
            });
        }
    };

    // defining a method to validate incoming request query data
    const requestQueryValidator = async (req, res, next) => {
        try {
            // validating incoming request query

            // validating the incoming schema
            await inputSchema.validateAsync(req.query, {
                abortEarly: false,
            });

            // forwarding the request to the next handler
            next();
        } catch (error) {
            // this code runs in case the incoming data's validation fails against
            // defined schema
            let errorDescription = {};

            error.details.map((detail) => {
                let errorKey = detail.context.key;
                let errorMessage = detail.message.replace(/"/g, ``);
                if (detail.type === "object.oxor") {
                    // Handle oxor error
                    errorKey = detail.context.peers.join("_");
                    errorMessage = `The fields ${detail.context.peers.join(
                        " and "
                    )} cannot be present at the same time.`;
                } else {
                    // Handle other errors
                    errorKey = detail.context.key;
                }
                errorDescription[`${errorKey}`] = errorMessage;
            });

            // returning the response with an error message
            return res.status(400).json({
                status: "FAILED",
                message: "Data Validation Failed",
                errors: errorDescription,
            });
        }
    };

    // defining a method to validate path params of url for incoming request
    const requestPathParamsValidator = async (req, res, next) => {
        try {
            // validating incoming request's path params
            if (!Object.keys(req.params).length) {
                // this code runs in case incoming request's path params is empty

                // returning the response with an error message
                return res.status(400).json({
                    status: "FAILED",
                    message: "Data Validation Failed",
                    error: {
                        error: `Incoming request path params can't be empty.`,
                    },
                });
            }

            // validating the incoming schema
            await inputSchema.validateAsync(req.params, {
                abortEarly: false,
            });

            // forwarding the request to the next handler
            next();
        } catch (error) {
            // this code runs in case the incoming data's validation fails against
            // defined schema

            let errorDescription = {};

            error.details.map((detail) => {
                let errorKey = detail.context.key;
                let errorMessage = detail.message.replace(/"/g, ``);
                errorDescription[`${errorKey}`] = errorMessage;
            });

            // returning the response with an error message
            return res.status(400).json({
                status: "FAILED",
                message: "Data Validation Failed",
                error: errorDescription,
            });
        }
    };

    // defining a method to let the request pass without any validation
    const requestDummyValidator = async (req, res, next) => {
        // forwarding the request to the next handler
        next();
    };

    // returning the function upon invocation by the router
    return schemaScope.toUpperCase() === "BODY"
        ? requestBodyValidator
        : schemaScope.toUpperCase() === "PARAMS"
          ? requestPathParamsValidator
          : schemaScope.toUpperCase() === "QUERY"
            ? requestQueryValidator
            : requestDummyValidator;
};

module.exports = validateRequest;
