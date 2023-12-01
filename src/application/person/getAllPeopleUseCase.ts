import { IPerson, Person } from '../../domain/entities/person';
import { IPersonWithTranslatedKeys } from '../../domain/entities/personWithTranslatedKeys';
import { IPersonRepository } from '../../domain/repositories/personRepository';
import { IUseCase } from '../IUseCase';

export class GetAllPeopleUseCase implements IUseCase<never, IPersonWithTranslatedKeys[]> {
  private readonly personRepository: IPersonRepository;

  constructor(
    personRepository: IPersonRepository
  ) {
    this.personRepository = personRepository;
  }

  async execute(): Promise<IPersonWithTranslatedKeys[]> {
    const result: IPerson[] = await this.personRepository.getAllPeople();
    return result.map((person: IPerson) => Person.toObjectWithTranslatedKeys(person));
  }
}
