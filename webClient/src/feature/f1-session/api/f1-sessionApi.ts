import { apiClient } from '@/shared/api/apiClient';

import type {
    ConnectF1AccauntDto,
    ConnectF1AccauntResponse,
    F1SessionStatusResponse,
} from '../model';

const baseUrl = 'f1/session';

export const f1SessionApi = {
    getF1SessionStatus: async () => {
        const { data } = await apiClient.get<F1SessionStatusResponse>(
            `${baseUrl}/status`,
        );
        return data;
    },
    connectF1Accaunt: async (dto: ConnectF1AccauntDto) => {
        const { data } = await apiClient.post<ConnectF1AccauntResponse>(
            `${baseUrl}/connect`,
            dto,
        );

        return data;
    },
};
