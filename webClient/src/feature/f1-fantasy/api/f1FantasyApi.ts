import { apiClient } from '@/shared/api/apiClient';

export const f1FantasyApi = {
    healthCheck: async () => {
        const { data } = await apiClient.get<string>('');
        return data;
    },
};
