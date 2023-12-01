import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import {constants as httpConstants} from 'node:http2';
import {GetOnePersonBySwapiIdUseCase} from '../../../application/person/getOnePersonBySwapiIdUseCase';
import {IPersonWithTranslatedKeys} from '../../../domain/entities/personWithTranslatedKeys';
import {IPersonRepository} from '../../../domain/repositories/personRepository';
import {IStarWarsService} from '../../../domain/services/starWarsService';
import {StarWarsService} from '../../external/http/starWarsService';
import {PersonDynamoDbRepository} from '../dynamodb/personDynamoDbRepository';

export const getOnePersonBySwapiIdHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const swapiPersonId = event.pathParameters?.id;

    if (!swapiPersonId) {
      return {
        statusCode: httpConstants.HTTP_STATUS_BAD_REQUEST,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'bad request',
          message: 'Missing id parameter',
        }),
      };
    }

    for (const i of [1, 2, 3]) {
      console.log(i);
    }

    const personRepository: IPersonRepository = new PersonDynamoDbRepository();
    const starWarsService: IStarWarsService = new StarWarsService();
    const getOnePersonBySwapiIdUseCase: GetOnePersonBySwapiIdUseCase = new GetOnePersonBySwapiIdUseCase(personRepository, starWarsService);
    const person: IPersonWithTranslatedKeys | null = await getOnePersonBySwapiIdUseCase.execute(swapiPersonId);

    if (!person) {
      return {
        statusCode: httpConstants.HTTP_STATUS_NOT_FOUND,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'not found',
          message: 'Person not found',
        }),
      };
    }

    return {
      statusCode: httpConstants.HTTP_STATUS_OK,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: 'ok',
        data: person,
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
