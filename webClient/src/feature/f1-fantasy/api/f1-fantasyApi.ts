import { apiClient } from '@/shared/api/apiClient';

const baseUrl = 'f1/fantasy';

export const f1FantasyApi = {
    getDrivers: async () => {
        const { data } = await apiClient.get<string>(`${baseUrl}/drivers`);
        return data;
    },
    getMe: async () => {
        // userId: string = 'd025a628-18c6-11f1-8584-91067885f997'
        // /?userId=${userId}
        const { data } = await apiClient.get(`${baseUrl}/me`);

        return data;
    },
};
