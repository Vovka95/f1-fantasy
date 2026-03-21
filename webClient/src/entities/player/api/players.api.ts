import { apiClient } from '@/shared/api/apiClient';

import type { PlayersListResponse } from './players-list-response.types';

export const getPlayersList = async (raceWeek: number) => {
    const { data } = await apiClient.get<PlayersListResponse>(
        'f1/fantasy/players',
        { params: { raceWeek } },
    );

    return data;
};
