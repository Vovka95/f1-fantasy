import { useQuery } from '@tanstack/react-query';

import { getLeaderboard } from './leaderboard.api';

import { qk } from '@/app/config/queryKey';

type UseLeaderboardQueryParams = {
    leagueId: string;
};

export const useLeaderboardQuery = ({
    leagueId,
}: UseLeaderboardQueryParams) => {
    return useQuery({
        queryKey: qk.f1.leaderboard(leagueId!),
        queryFn: () => getLeaderboard(leagueId),
        select: (data) => data.Value.leaderboard,
        retry: false,
        enabled: !!leagueId,
        staleTime: 60_000,
    });
};
