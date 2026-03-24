import { apiClient } from '@/shared/api/apiClient';

import type { FantasyTeamResponse } from './fantasy-team-response.type';

export const getFantasyTeam = async (
    userId: string,
    raceWeek: number,
    teamNo: number,
) => {
    const { data } = await apiClient.get<FantasyTeamResponse>(
        'f1/fantasy/fantasy-team',
        { params: { userId, raceWeek, teamNo } },
    );

    return data;
};
