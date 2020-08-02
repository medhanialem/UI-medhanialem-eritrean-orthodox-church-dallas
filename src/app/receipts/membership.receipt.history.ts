export class MembershipReceiptHistory {
    id: number;
    churchId: string;
    memberId: number;
    fullName: string;
    months: number;
    monthsDetails: string;
    createdBy: string;
    createdDate: Date;
    phone: string;
    parentReceipt: number;
    receiptId: number;
    remarks: string;
    tierDescription: string;
    total: number;
    voided: boolean;
    year: number;
    email: string;
}
