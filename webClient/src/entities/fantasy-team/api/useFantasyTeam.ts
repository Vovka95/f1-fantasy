import { useQuery } from '@tanstack/react-query';

import type { TeamOwnerType } from '@/feature/team-owner-switch';
import { getFantasyTeamQueryOptions } from './fantasy-team-query-options';

type UseFantasyTeamQueryParams = {
    userId?: TeamOwnerType;
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
