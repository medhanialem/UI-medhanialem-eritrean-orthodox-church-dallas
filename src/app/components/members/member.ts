
export class Member {
    memberId: number;
    churchId: string; // Auto generated Id: MOECD-1
    oldChurchId: number; // Manually entered for existing church members - before the app creation
    legacyId: string;
    firstName: string;
    middleName: string;
    lastName: string;
    gender: string;
    maritalStatus: string;
    homePhoneNo: string;
    workPhoneNo: string;
    email: string;
    streetAddress: string;
    apartmentNo: string;
    city: string;
    state: string;
    zipCode: string;
    registrationDate: Date;
    paymentStartDate: Date;
    superId: number;
    relationShip: string;
    createdDate: Date;
    createdBy: number;
    updatedDate: Date;
    updatedBy: number;
    status: string;
    sebekaGubae: boolean;
    sundaySchool: boolean;
    constructor(public tier: Tier) {

    }
}

export class Tier {
    id: number;
    description: string;
    tierType: string;
}
