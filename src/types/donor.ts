export interface Donor {
    id?: number;
    customId?: string;
    fullName: string;
    phoneNumber: string;
    address: string;
    marriedStatus: boolean;
    dateOfBirth: string;
    placeOfBirth: string;
    email: string;
    bloodGroup: string;
    rhFactor: string;
    phenotype: string;
    donationDate: string;
}