export class PaymentResponse {
    memberId: number;
    churchId: string;
    fullName: string;
    tierDescription: string;
    numberOfMonthsPaid: number;
    total: number;
    amountsPaidPerMonth: AmountsPaidPerMonth[];
}

export interface AmountsPaidPerMonth {
        month: string;
        amount: number;
}