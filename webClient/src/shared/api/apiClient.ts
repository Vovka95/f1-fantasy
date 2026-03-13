import axios, { AxiosError } from 'axios';
import { httpConfig } from './httpConfig';
import type { ApiErrorResponse } from './error';

import { useF1SessionStore } from '../store/f1-session';

export const apiClient = axios.create({
    baseURL: httpConfig.baseUrl,
    timeout: httpConfig.timeoutMs,
    withCredentials: true,
});

apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ApiErrorResponse>) => {
        const errorCode = error.response?.data?.code;

        if (errorCode === 'F1_SESSION_EXPIRED') {
            useF1SessionStore.getState().setExpired(true);
        }

        return Promise.reject(error);
    },
);
