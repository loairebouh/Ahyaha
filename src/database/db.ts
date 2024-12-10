import Dexie, { Table } from 'dexie';
import { Donor } from '../types/donor';

class DonorDatabase extends Dexie {
    donors!: Table<Donor>;

    constructor() {
        super('DonorDatabase');
        this.version(1).stores({
            donors: '++id, fullName, bloodGroup, rhFactor, phenotype',
        });
    }
}

export const db = new DonorDatabase();
