import {
    DynamoDBClient,
    type DynamoDBClientConfig,
} from "@aws-sdk/client-dynamodb";
import {
    DynamoDBDocumentClient,
    PutCommand,
    type PutCommandInput,
    type PutCommandOutput,
    QueryCommand,
    type QueryCommandInput,
    type QueryCommandOutput,
    ScanCommand,
    type ScanCommandInput,
    type ScanCommandOutput,
} from "@aws-sdk/lib-dynamodb";
import type { IPerson } from "@/domain/entities/person";
import type { IPersonRepository } from "@/domain/repositories/personRepository";

export class PersonDynamoDbRepository implements IPersonRepository {
    private readonly dynamoDbDocumentClient: DynamoDBDocumentClient;
    private readonly personTableName: string;
    private readonly swapiIdIndexName: string;

    constructor() {
        const dynamoDbClientConfig: DynamoDBClientConfig = {};
        const dynamoDbClient = new DynamoDBClient(dynamoDbClientConfig);

        this.dynamoDbDocumentClient = DynamoDBDocumentClient.from(dynamoDbClient);
        this.personTableName = process.env.PEOPLE_TABLE_NAME || "";
        this.swapiIdIndexName = process.env.SWAPI_ID_INDEX_NAME || "";
    }

    async getAllPeople(): Promise<IPerson[]> {
        const inputCommand: ScanCommandInput = {
            TableName: this.personTableName,
        };
        const command = new ScanCommand(inputCommand);
        const result: ScanCommandOutput = await this.dynamoDbDocumentClient.send(command);

        return (result.Items as IPerson[]) || [];
    }

    async savePerson(newPerson: IPerson): Promise<void> {
        const inputCommand: PutCommandInput = {
            TableName: this.personTableName,
            Item: newPerson,
        };
        const command = new PutCommand(inputCommand);
        const result: PutCommandOutput = await this.dynamoDbDocumentClient.send(command);
        console.log("PersonDynamoDbRepository -> savePerson -> result", result);
    }

    async getPersonsBySwapiId(swapiPersonId: string): Promise<IPerson[]> {
        const inputCommand: QueryCommandInput = {
            TableName: this.personTableName,
            IndexName: this.swapiIdIndexName,
            KeyConditionExpression: "swapiPersonId = :swapiPersonId",
            ExpressionAttributeValues: { ":swapiPersonId": swapiPersonId },
        };
        const command = new QueryCommand(inputCommand);
        const result: QueryCommandOutput = await this.dynamoDbDocumentClient.send(command);

        return (result.Items as IPerson[]) || [];
    }
}
