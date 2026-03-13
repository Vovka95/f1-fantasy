export class F1SessionResponseDto {
    isValid: boolean;
    lastValidatedAt: Date | null;
    expiredAt: Date | null;
    lastError: string | null;
    updatedAt: Date;
}
