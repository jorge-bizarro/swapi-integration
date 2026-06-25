import type { IUseCase } from "@/application/IUseCase";
import { type IPerson, Person } from "@/domain/entities/person";
import type { IPersonWithTranslatedKeys } from "@/domain/entities/personWithTranslatedKeys";
import type { IPersonRepository } from "@/domain/repositories/personRepository";

export class GetAllPeopleUseCase implements IUseCase<never, IPersonWithTranslatedKeys[]> {
    private readonly personRepository: IPersonRepository;

    constructor(personRepository: IPersonRepository) {
        this.personRepository = personRepository;
    }

    async execute(): Promise<IPersonWithTranslatedKeys[]> {
        const result: IPerson[] = await this.personRepository.getAllPeople();
        return result.map((person: IPerson) => Person.toObjectWithTranslatedKeys(person));
    }
}
