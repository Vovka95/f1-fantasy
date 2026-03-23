import { apiClient } from '@/shared/api/apiClient';

import type { F1FantasyScheduleResponse } from './f1-schedule-response.type';

export const getF1Schedule = async () => {
    const { data } = await apiClient.get<F1FantasyScheduleResponse>(
        'f1/fantasy/schedule',
    );

    return data;
};
