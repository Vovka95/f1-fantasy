import { useQuery } from '@tanstack/react-query';
import { getPlayerStatsQueryOptions } from './player-stats-query-options';

type UsePlayersQueryParams = {
    playerId?: string;
};

export const usePlayerStatsQuery = ({ playerId }: UsePlayersQueryParams) => {
    return useQuery({
        ...getPlayerStatsQueryOptions(playerId),
    });
};
