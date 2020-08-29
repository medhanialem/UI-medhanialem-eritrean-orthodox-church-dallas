import { TierModel } from '../tiers/tier.model';

export class LookupModel {
    id: number;
    month: number;
    year: number;
    tier: TierModel;
    amount: number;
    revision: number;
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
}