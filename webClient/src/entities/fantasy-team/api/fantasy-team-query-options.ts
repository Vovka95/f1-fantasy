import { mapFantasyTeam } from '../model/mappers';
import { getFantasyTeam } from './fantasy-team.api';

import type { TeamOwnerType } from '@/feature/team-owner-switch';

import { qk } from '@/app/config/queryKey';

export const getFantasyTeamQueryOptions = (
    userId?: TeamOwnerType,
    raceWeek?: number,
) => ({
    queryKey: qk.f1.fantasyTeam(userId!, raceWeek!),
    queryFn: () => getFantasyTeam(userId!, raceWeek!),
    select: (data: Awaited<ReturnType<typeof getFantasyTeam>>) =>
        mapFantasyTeam(data.Data.Value.userTeam[0]),
    retry: false,
    enabled: !!userId && Number.isFinite(raceWeek),
    staleTime: 60_000,
});
