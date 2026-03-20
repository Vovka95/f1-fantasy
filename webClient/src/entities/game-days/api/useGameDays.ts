import { useQuery } from '@tanstack/react-query';

import type { GameDaysResponse } from './game-days-response.type';
import { mapGameDaysTeam } from '../model/game-days.mapper';

import { apiClient } from '@/shared/api/apiClient';

import { qk } from '@/app/config/queryKey';

const getUserGameDays = async (userId: string) => {
    const { data } = await apiClient.get<GameDaysResponse>(
        'f1/fantasy/game-days',
        { params: { userId } },
    );

    return data;
};

type UseFantasyTeamQueryParams = {
    userId: string;
};

export const useGameDaysQuery = ({ userId }: UseFantasyTeamQueryParams) => {
    return useQuery({
        queryKey: qk.f1.userGameDays(userId),
        queryFn: () => getUserGameDays(userId),
        select: (data) => mapGameDaysTeam(data.Data.Value[0]),
        retry: false,
        enabled: !!userId,
        staleTime: 60_000,
    });
};
