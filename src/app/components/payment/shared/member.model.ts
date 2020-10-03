export interface MemberModel{
    memberId: number;
    churchId: string;
    firstName: string;
    middleName: string;
    lastName: string;
    tier: number;
    homePhoneNo: string;
    registrationDate: Date;
    paymentStartDate: Date;
    unpaidMonths: number;
    paymentLogs: PaymentLog[];
    status: string;
}

export interface PaymentLog {
    paymentLogId: number;
    year: number;
    month: number;
    amount: number;
    forgiven: boolean;
}
