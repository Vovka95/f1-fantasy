import { useQuery } from '@tanstack/react-query';

import { qk } from '@/app/config/queryKey';
import { apiClient } from '@/shared/api/apiClient';

import type { PlayersListResponse } from './players-list-response.types';
import { mapPlayers } from '../model/player.maper';

const getPlayersList = async (raceWeek: number) => {
    const { data } = await apiClient.get<PlayersListResponse>(
        'f1/fantasy/players',
        { params: { raceWeek } },
    );

    return data;
};

type UsePlayersQueryParams = {
    raceWeek: number;
};

export const usePlayersQuery = ({ raceWeek }: UsePlayersQueryParams) => {
    return useQuery({
        queryKey: qk.f1.playersList(raceWeek),
        queryFn: () => getPlayersList(raceWeek),
        select: (data) => mapPlayers(data.Data.Value),
        retry: false,
        enabled: Number.isFinite(raceWeek),
        staleTime: 60_000,
    });
};
