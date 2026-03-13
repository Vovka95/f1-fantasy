import { apiClient } from '@/shared/api/apiClient';

export const healthApi = {
    healthCheck: async () => {
        const { data } = await apiClient.get<string>('health');
        return data;
    },
};
