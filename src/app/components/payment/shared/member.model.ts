export interface MemberModel{
    memberId:number;
    churchId: string;
    firstName:string;
    middleName: string;
    lastName:string;
    tier: number;
    homePhoneNo: string;
    registrationDate: Date;
    unpaidMonths: number;
    paymentLog: PaymentLog[];
}

export interface PaymentLog{
    paymentLogId:number;
    year:number;
    month:number;
    amount:number;
}