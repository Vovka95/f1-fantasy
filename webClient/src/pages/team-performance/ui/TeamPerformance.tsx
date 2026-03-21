import { useGameDaysQuery } from '@/entities/game-days';
import { khrystynaId, volodymyrId } from '@/feature/team-owner-switch';

import { TeamComparisonWidget } from '@/widgets/team-comparison';
import { FantasyTeamsByRaceWeek } from '@/widgets/fantasy-teams-by-race-week';

import { FullPageLoader } from '@/shared/ui';

export const TeamPerformance = () => {
    const gameDaysQuery = useGameDaysQuery({ userId: volodymyrId });

    if (!gameDaysQuery.data || gameDaysQuery.isLoading) {
        return <FullPageLoader />;
    }

    const completedRaceWeeksIds = gameDaysQuery.data.raceWeeks.raceWeekSeries
        .filter((rw) => rw.points)
        .map((rw) => rw.raceWeekId);

    const raceWeeksIds = gameDaysQuery.data.raceWeeks.raceWeekSeries.map(
        (rw) => rw.raceWeekId,
    );

    return (
        <div className="flex gap-4 w-full h-full justify-center">
            <div className="flex flex-col w-full h-full max-w-400 gap-4 overflow-hidden">
                <TeamComparisonWidget
                    leftUserId={volodymyrId}
                    rightUserId={khrystynaId}
                    raceWeeks={completedRaceWeeksIds}
                />
                <FantasyTeamsByRaceWeek
                    leftUserId={volodymyrId}
                    rightUserId={khrystynaId}
                    raceWeeks={raceWeeksIds}
                />
            </div>
        </div>
    );
};
