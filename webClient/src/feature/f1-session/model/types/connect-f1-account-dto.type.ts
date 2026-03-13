import type { ConnectF1AccauntValues } from '../schemas';

export type ConnectF1AccauntDto = ConnectF1AccauntValues;

export type ConnectF1AccauntResponse = {
    isValid: boolean;
    lastValidatedAt: Date | null;
    expiredAt: Date | null;
    lastError: string | null;
    updatedAt: Date;
};
