import { useQuery } from '@tanstack/react-query';

import { qk } from '@/app/config/queryKey';
import { apiClient } from '@/shared/api/apiClient';

import type { PlayersListResponse } from './players-list-response.types';
import { mapPlayersList } from '../model/players-list.mapper';

const getPlayersList = async (raceWeek: number) => {
    const { data } = await apiClient.get<PlayersListResponse>(
        'f1/fantasy/players',
        { params: { raceWeek } },
    );

    return data;
};

type UsePlayersListQueryParams = {
    raceWeek: number;
};

export const usePlayersListQuery = ({
    raceWeek,
}: UsePlayersListQueryParams) => {
    return useQuery({
        queryKey: qk.f1.playersList(raceWeek),
        queryFn: () => getPlayersList(raceWeek),
        select: (data) => mapPlayersList(data.Data.Value),
        retry: false,
        enabled: Number.isFinite(raceWeek),
        staleTime: 60_000,
    });
};
