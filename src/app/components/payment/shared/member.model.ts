export interface MemberModel{
    memberId:number;
    firstName:string;
    middleName: string;
    lastName:string;
    tier: number;
    registrationDate: Date;
    paymentLog: PaymentLog[];
}

export interface PaymentLog{
    paymentLogId:number;
    year:number;
    month:number;
    amount:number;
}