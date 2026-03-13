import axios, { AxiosError } from 'axios';
import { httpConfig } from './httpConfig';
import type { ApiErrorResponse } from './error';

import { useF1SessionStore } from '../store/f1-session';
import { useF1ConnectDialogStore } from '../store/f1-connect-dialog';

export const apiClient = axios.create({
    baseURL: httpConfig.baseUrl,
    timeout: httpConfig.timeoutMs,
});

apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ApiErrorResponse>) => {
        const errorCode = error.response?.data?.code;

        if (errorCode === 'F1_SESSION_EXPIRED') {
            useF1SessionStore.getState().setExpired(true);
        }

        if (errorCode === 'SESSION_NOT_CONFIGURED') {
            useF1SessionStore.getState().setConfigured(false);
            useF1ConnectDialogStore.getState().setOpen(true);
        }

        return Promise.reject(error);
    },
);
