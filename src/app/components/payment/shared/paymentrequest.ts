export class Paymentrequest {
    memberId: number;
    total: number;
    payments: MonthlyPaid[];
    constructor() {}
}

export interface MonthlyPaid {
        paymentLookupId: number;
        amount: number;
}
