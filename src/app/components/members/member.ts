
export class Member {
    memberId: number;
    churchId: string; // Auto generated Id: MOECD-1
    legacyId: string;
    firstName: string;
    middleName: string;
    lastName: string;
    gender: string;
    homePhoneNo: string;
    workPhoneNo: string;
    email: string;
    streetAddress: string;
    apartmentNo: string;
    city: string;
    state: string;
    zipCode: string;
    registrationDate: Date;
    superId: number;
    relationShip: string;
    createdDate: Date;
    createdBy: number;
    updatedDate: Date;
    updatedBy: number;
    status: boolean;
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
