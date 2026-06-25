import type { IPerson } from "@/domain/entities/person";

export interface IPersonRepository {
    getAllPeople(): Promise<IPerson[]>;
    savePerson(newPerson: IPerson): Promise<void>;
    getPersonsBySwapiId(swapiPersonId: string): Promise<IPerson[]>;
}
