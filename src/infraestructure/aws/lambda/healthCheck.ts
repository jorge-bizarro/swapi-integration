import { constants as httpConstants } from "node:http2";
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import packageJson from "../../../../package.json";

export const healthCheckHandler = async (_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        return {
            statusCode: httpConstants.HTTP_STATUS_OK,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                status: "ok",
                data: packageJson.version,
            }),
        };
    } catch (error) {
        return {
            statusCode: httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                status: "internal server error",
                message: `${error}`,
            }),
        };
    }
};
