import { useQuery } from '@tanstack/react-query';

import { getPlayersQueryOptions } from './players-query-options';

type UsePlayersQueryParams = {
    raceWeek?: number;
};

export const usePlayersQuery = ({ raceWeek }: UsePlayersQueryParams) => {
    return useQuery({
        ...getPlayersQueryOptions(raceWeek),
        enabled: Number.isFinite(raceWeek),
    });
};
