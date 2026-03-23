import { useLeaderboardQuery } from '@/entities/leaderboard';

import { FullPageLoader } from '@/shared/ui';

const leagueId = '6969703';

export const LeaderboardPage = () => {
    const { data, isLoading } = useLeaderboardQuery({ leagueId: leagueId });

    if (isLoading) {
        return <FullPageLoader />;
    }

    return <div>{data?.Value.leaderboard.length}</div>;
};
