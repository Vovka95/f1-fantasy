import { useQuery } from '@tanstack/react-query';

import { getFantasyTeamQueryOptions } from './fantasy-team-query-options';

type UseFantasyTeamQueryParams = {
    userId?: string;
    teamNo?: number;
    raceWeek?: number;
};

export const useFantasyTeamQuery = ({
    userId,
    raceWeek,
    teamNo = 1,
}: UseFantasyTeamQueryParams) => {
    return useQuery({
        ...getFantasyTeamQueryOptions(userId, raceWeek, teamNo),
        enabled:
            !!userId && Number.isFinite(raceWeek) && Number.isFinite(teamNo),
    });
};
