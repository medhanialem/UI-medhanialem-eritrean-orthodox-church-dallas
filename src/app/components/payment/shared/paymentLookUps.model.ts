export interface TierPaymentLookUp{
tierId:number;
paymentLookUps: PaymentLookUp[];
}

export interface PaymentLookUp{
    paymentLookupId:number;
    year:number;
    month:number;
    amount:number;
}