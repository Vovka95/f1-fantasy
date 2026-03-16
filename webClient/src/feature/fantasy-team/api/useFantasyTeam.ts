import { useQuery } from '@tanstack/react-query';

import { qk } from '@/app/config/queryKey';
import { apiClient } from '@/shared/api/apiClient';

import type { FantasyTeamResponse } from './fantasy-team-response.type';
import { mapFantasyTeam } from '../model/fantasy-team.mapper';

const getFantasyTeam = async (userId: string, raceWeek: number) => {
    const { data } = await apiClient.get<FantasyTeamResponse>(
        'f1/fantasy/fantasy-team',
        { params: { userId, raceWeek } },
    );

    return data;
};

type UseFantasyTeamQueryParams = {
    userId: string;
    raceWeek: number;
};

export const useFantasyTeamQuery = ({
    userId,
    raceWeek,
}: UseFantasyTeamQueryParams) => {
    return useQuery({
        queryKey: qk.f1.fantasyTeam(userId, raceWeek),
        queryFn: () => getFantasyTeam(userId, raceWeek),
        select: (data) => mapFantasyTeam(data.Data.Value.userTeam[0]),
        retry: false,
        enabled: !!userId && Number.isFinite(raceWeek),
        staleTime: 60_000,
    });
};
