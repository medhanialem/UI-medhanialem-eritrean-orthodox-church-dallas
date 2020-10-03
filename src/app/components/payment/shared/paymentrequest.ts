export class Paymentrequest {
    memberId: number;
    total: number;
    payments: MonthlyPaid[];
    forgiven: boolean;
    constructor() {}
}

export interface MonthlyPaid {
        paymentLookupId: number;
        amount: number;
}
