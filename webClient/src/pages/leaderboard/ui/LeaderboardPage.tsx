import { useEffect, useMemo, useState } from 'react';

import {
    FantasyTeamCard,
    mapFantasyTeamToView,
    useFantasyTeamQuery,
} from '@/entities/fantasy-team';
import { useActiveRaceWeek } from '@/entities/game-days';
import { LeaderboardList, useLeaderboardQuery } from '@/entities/leaderboard';
import { usePlayersQuery } from '@/entities/player';

import { FullPageLoader } from '@/shared/ui';
import { cn } from '@/shared/lib/cn';

const leagueId = '6969703';

export const LeaderboardPage = () => {
    const [selectedUserId, setSelectedUserId] = useState<string>();
    const { activeRaceWeekId } = useActiveRaceWeek();
    const leaderboardQuery = useLeaderboardQuery({ leagueId: leagueId });

    const playersQuery = usePlayersQuery({ raceWeek: activeRaceWeekId });
    const fantasyTeamQuery = useFantasyTeamQuery({
        userId: selectedUserId,
        raceWeek: activeRaceWeekId,
    });

    const selectedFantasyTeam = useMemo(() => {
        if (!playersQuery.data || !fantasyTeamQuery.data) {
            return null;
        }

        return mapFantasyTeamToView(
            fantasyTeamQuery.data,
            playersQuery.data?.preview,
        );
    }, [fantasyTeamQuery.data, playersQuery.data]);

    useEffect(() => {
        leaderboardQuery.data &&
            setSelectedUserId(leaderboardQuery.data[0].user_guid);
    }, [leaderboardQuery.data]);

    if (
        leaderboardQuery.isLoading ||
        !leaderboardQuery.data ||
        playersQuery.isLoading ||
        !playersQuery.data
    ) {
        return <FullPageLoader />;
    }

    return (
        <div className="flex w-full h-full justify-center">
            <div
                className={cn(
                    'grid  w-full h-full max-w-400 min-h-0 overflow-hidden grid-cols-2 gap-4',
                )}
            >
                <div className="flex w-full h-full flex-col min-h-0 overflow-hidden">
                    <LeaderboardList
                        teams={leaderboardQuery.data}
                        playersPreview={playersQuery.data.preview}
                        selectedUserId={selectedUserId}
                        onClick={(userId) => setSelectedUserId(userId)}
                    />
                </div>

                <div className="flex w-full h-full flex-col min-h-0 overflow-hidden">
                    {selectedFantasyTeam && (
                        <FantasyTeamCard
                            players={selectedFantasyTeam.players}
                            summary={selectedFantasyTeam.summary}
                            id={selectedFantasyTeam.id}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
