import type { AxiosError } from 'axios';

import type { ApiErrorResponse, ApiErrorCode } from './apiError';

type BackendErrorShape = {
    code?: string;
    message?: string;
    error?: string;
    statusCode?: number;
    details?: unknown;
};

export const normalizeApiError = (err: unknown): ApiErrorResponse => {
    const fallback: ApiErrorResponse = {
        code: 'UNKNOWN',
        message: ['Something went wrong'],
    };

    if (!err || typeof err !== 'object') return fallback;

    const axiosErr = err as AxiosError<BackendErrorShape>;
    const data = axiosErr.response?.data;

    const code = (data?.code as ApiErrorResponse['code']) || fallback.code;
    const message =
        data?.message || data?.error || axiosErr.message || fallback.message;

    const messageList = Array.isArray(message) ? message : [message];

    return {
        code: (code as ApiErrorCode) || 'UNKNOWN',
        message: messageList,
    };
};
