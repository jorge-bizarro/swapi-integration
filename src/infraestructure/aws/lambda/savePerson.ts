import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import {constants as httpConstants} from 'node:http2';
import {SavePersonUseCase} from '../../../application/person/savePersonUseCase';
import {IPersonWithTranslatedKeys} from '../../../domain/entities/personWithTranslatedKeys';
import {IPersonRepository} from '../../../domain/repositories/personRepository';
import {PersonDynamoDbRepository} from '../dynamodb/personDynamoDbRepository';

export const savePersonHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return {
        statusCode: httpConstants.HTTP_STATUS_BAD_REQUEST,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'bad request',
          message: 'Missing body',
        }),
      };
    }

    const newPerson: IPersonWithTranslatedKeys = JSON.parse(event.body as string);
    const personRepository: IPersonRepository = new PersonDynamoDbRepository();
    const savePersonUseCase: SavePersonUseCase = new SavePersonUseCase(personRepository);
    await savePersonUseCase.execute(newPerson);

    return {
      statusCode: httpConstants.HTTP_STATUS_CREATED,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: 'created',
        data: 'Person created',
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
