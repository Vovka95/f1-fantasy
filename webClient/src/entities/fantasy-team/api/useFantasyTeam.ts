import { useQuery } from '@tanstack/react-query';

import { getFantasyTeamQueryOptions } from './fantasy-team-query-options';

type UseFantasyTeamQueryParams = {
    userId?: string;
    raceWeek?: number;
};

export const useFantasyTeamQuery = ({
    userId,
    raceWeek,
}: UseFantasyTeamQueryParams) => {
    return useQuery({
        ...getFantasyTeamQueryOptions(userId, raceWeek),
        enabled: !!userId && Number.isFinite(raceWeek),
    });
};
