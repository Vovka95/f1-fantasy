import { apiClient } from '@/shared/api/apiClient';

import type { LeaderboardResponse } from './leaderboard-response.type';

export const getLeaderboard = async (leagueId: string) => {
    const { data } = await apiClient.get<LeaderboardResponse>(
        'f1/fantasy/leaderboard',
        { params: { leagueId } },
    );

    return data;
};
