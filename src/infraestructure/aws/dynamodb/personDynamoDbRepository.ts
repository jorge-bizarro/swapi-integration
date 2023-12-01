import { AttributeValue, DynamoDBClient, DynamoDBClientConfig, PutItemCommand, PutItemCommandInput, PutItemCommandOutput, QueryCommand, ScanCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommandInput, QueryCommandOutput, ScanCommandInput, ScanCommandOutput } from '@aws-sdk/lib-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { IPerson } from '../../../domain/entities/person';
import { IPersonRepository } from '../../../domain/repositories/personRepository';

export class PersonDynamoDbRepository implements IPersonRepository {
  private readonly dynamoDbDocumentClient: DynamoDBDocumentClient;
  private readonly personTableName: string;
  private readonly swapiIdIndexName: string;

  constructor() {
    const dynamoDbClientConfig: DynamoDBClientConfig = {};

    if (process.env.IS_OFFLINE && process.env.STAGE === 'local') {
      dynamoDbClientConfig.endpoint = process.env.DYNAMODB_ENDPOINT_LOCAL;
    }

    const dynamoDbClient = new DynamoDBClient(dynamoDbClientConfig);

    this.dynamoDbDocumentClient = DynamoDBDocumentClient.from(dynamoDbClient);
    this.personTableName = process.env.PEOPLE_TABLE_NAME || '';
    this.swapiIdIndexName = process.env.SWAPI_ID_INDEX_NAME || '';
  }

  async getAllPeople(): Promise<IPerson[]> {
    const inputCommand: ScanCommandInput = {
      TableName: this.personTableName,
    };
    const command: ScanCommand = new ScanCommand(inputCommand);
    const result: ScanCommandOutput = await this.dynamoDbDocumentClient.send(command);

    return result.Items?.map((item) => unmarshall(item) as IPerson) || [];
  }

  async savePerson(newPerson: IPerson): Promise<void> {
    const item: Record<string, AttributeValue> | undefined = marshall(newPerson, {
      convertClassInstanceToMap: true,
      removeUndefinedValues: true,
      convertEmptyValues: true,
    });
    const inputCommand: PutItemCommandInput = {
      TableName: this.personTableName,
      Item: item,
    };
    const command: PutItemCommand = new PutItemCommand(inputCommand);
    const result: PutItemCommandOutput = await this.dynamoDbDocumentClient.send(command);
    console.log('PersonDynamoDbRepository -> savePerson -> result', result);
  }

  async getPersonsBySwapiId(swapiPersonId: string): Promise<IPerson[]> {
    const inputCommand: QueryCommandInput = {
      TableName: this.personTableName,
      IndexName: this.swapiIdIndexName,
      KeyConditionExpression: 'swapiPersonId = :swapiPersonId',
      ExpressionAttributeValues: marshall({ ':swapiPersonId': swapiPersonId }),
    };
    const command: QueryCommand = new QueryCommand(inputCommand);
    const result: QueryCommandOutput = await this.dynamoDbDocumentClient.send(command);

    return result.Items?.map((item) => unmarshall(item) as IPerson) || [];
  }
}
