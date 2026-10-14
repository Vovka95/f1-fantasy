import { apiClient } from '@/shared/api/apiClient';

import type { PlayerStatsResponse } from './player-stats-response.types';

export const getPlayerStats = async (playerId: string) => {
    const { data } = await apiClient.get<PlayerStatsResponse>(
        'f1/fantasy/player-stats',
        { params: { playerId } },
    );

    return data;
};
