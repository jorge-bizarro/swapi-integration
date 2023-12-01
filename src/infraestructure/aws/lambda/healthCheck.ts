import {APIGatewayProxyResult} from 'aws-lambda';
import {readFile} from 'node:fs/promises';
import {constants as httpConstants} from 'node:http2';
import path from 'node:path';

export const healthCheckHandler = async (): Promise<APIGatewayProxyResult> => {
  try {
    const content = await readFile(path.join(process.cwd(), 'package.json'), 'utf8');
    const packageJson = JSON.parse(content);

    return {
      statusCode: httpConstants.HTTP_STATUS_OK,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: 'ok',
        data: packageJson.version,
      }),
    };
  } catch (error) {
    return {
      statusCode: httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: 'internal server error',
        message: `${error}`,
      }),
    };
  }
};
