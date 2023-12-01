import { IPerson, Person } from '../../domain/entities/person';
import { IPersonWithTranslatedKeys } from '../../domain/entities/personWithTranslatedKeys';
import { IStarWarsCharacter } from '../../domain/entities/starWarsCharacter';
import { IPersonRepository } from '../../domain/repositories/personRepository';
import { IStarWarsService } from '../../domain/services/starWarsService';
import { generateRandomUuid } from '../../utils';
import { IUseCase } from '../IUseCase';

export class GetOnePersonBySwapiIdUseCase implements IUseCase<string, IPersonWithTranslatedKeys | null> {
  private readonly personRepository: IPersonRepository;
  private readonly starWarsService: IStarWarsService;

  constructor(
    personRepository: IPersonRepository,
    starWarsService: IStarWarsService
  ) {
    this.personRepository = personRepository;
    this.starWarsService = starWarsService;
  }

  async execute(swapiPersonId: string): Promise<IPersonWithTranslatedKeys | null> {
    let personList: IPerson[] = await this.personRepository.getPersonsBySwapiId(swapiPersonId);
    let personFound: IPerson | undefined = personList.at(0);

    if (!personFound) {
      const starWarsCharacter: IStarWarsCharacter = await this.starWarsService.getCharacterById(Number(swapiPersonId));
      const newPerson: IPerson = Person.fromStarWarsCharacter(starWarsCharacter);
      newPerson.uuid = generateRandomUuid();
      newPerson.swapiPersonId = swapiPersonId;
      await this.personRepository.savePerson(newPerson);
      personList = await this.personRepository.getPersonsBySwapiId(swapiPersonId);
      personFound = personList.at(0);
    }

    if (!personFound) {
      return null;
    }

    return Person.toObjectWithTranslatedKeys(personFound);
  }
}
