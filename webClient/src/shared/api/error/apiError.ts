export type ApiErrorCode =
    | 'SESSION_NOT_CONFIGURED'
    | 'F1_SESSION_EXPIRED'
    | 'F1_PUBLIC_UNAUTORIZED'
    | 'F1_PUBLIC_FAILED'
    | 'F1_PRIVATE_FAILED'
    | 'UNKNOWN';

export type ApiErrorResponse = {
    statusCode?: number;
    message: string | string[];
    error?: string;
    code: ApiErrorCode;
};
