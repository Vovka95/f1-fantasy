import { mapFantasyTeam } from '../model/mappers';
import { getFantasyTeam } from './fantasy-team.api';

import { qk } from '@/app/config/queryKey';

export const getFantasyTeamQueryOptions = (
    userId?: string,
    raceWeek?: number,
    teamNo: number = 1,
) => ({
    queryKey: qk.f1.fantasyTeam(userId!, raceWeek!, teamNo),
    queryFn: () => getFantasyTeam(userId!, raceWeek!, teamNo),
    select: (data: Awaited<ReturnType<typeof getFantasyTeam>>) =>
        mapFantasyTeam(data.Data.Value.userTeam[0]),
    retry: false,
    enabled: !!userId && Number.isFinite(raceWeek),
    staleTime: 60_000,
});
