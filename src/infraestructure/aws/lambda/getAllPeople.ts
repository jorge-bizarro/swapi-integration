import { constants as httpConstants } from "node:http2";
import type { APIGatewayProxyResult } from "aws-lambda";
import { GetAllPeopleUseCase } from "@/application/person/getAllPeopleUseCase";
import type { IPersonWithTranslatedKeys } from "@/domain/entities/personWithTranslatedKeys";
import type { IPersonRepository } from "@/domain/repositories/personRepository";
import { PersonDynamoDbRepository } from "@/infraestructure/aws/dynamodb/personDynamoDbRepository";

export const getAllPeopleHandler = async (): Promise<APIGatewayProxyResult> => {
    try {
        const personRepository: IPersonRepository = new PersonDynamoDbRepository();
        const getAllPeopleUseCase: GetAllPeopleUseCase = new GetAllPeopleUseCase(personRepository);
        const result: IPersonWithTranslatedKeys[] = await getAllPeopleUseCase.execute();

        return {
            statusCode: httpConstants.HTTP_STATUS_OK,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                status: "ok",
                data: result,
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
