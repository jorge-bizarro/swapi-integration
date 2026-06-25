import type { IUseCase } from "@/application/IUseCase";
import { type IPerson, Person } from "@/domain/entities/person";
import type { IPersonWithTranslatedKeys } from "@/domain/entities/personWithTranslatedKeys";
import type { IPersonRepository } from "@/domain/repositories/personRepository";
import { generateRandomUuid } from "@/utils";

export class SavePersonUseCase implements IUseCase<IPersonWithTranslatedKeys, void> {
    private readonly personRepository: IPersonRepository;

    constructor(personRepository: IPersonRepository) {
        this.personRepository = personRepository;
    }

    async execute(newPersonWithTranslatedKeys: IPersonWithTranslatedKeys): Promise<void> {
        const newPerson: IPerson = Person.fromObjectWithTranslatedKeys(newPersonWithTranslatedKeys);
        newPerson.uuid = generateRandomUuid();
        newPerson.swapiPersonId = generateRandomUuid();
        await this.personRepository.savePerson(newPerson);
    }
}
