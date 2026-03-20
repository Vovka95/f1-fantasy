import { useGameDaysQuery } from '@/entities/game-days';
import { TeamComparison } from '@/feature/team-comparison';
import { khrystynaId, volodymyrId } from '@/feature/team-owner-switch';

import { FullPageLoader } from '@/shared/ui';

export const TeamPerformance = () => {
    const gameDaysQuery = useGameDaysQuery({ userId: volodymyrId });

    if (!gameDaysQuery.data || gameDaysQuery.isLoading) {
        return <FullPageLoader />;
    }

    const completedRaceWeeksIds = gameDaysQuery.data.raceWeeks.raceWeekSeries
        .filter((rw) => rw.points)
        .map((rw) => rw.raceWeekId);

    return (
        <div className="flex flex-col gap-3">
            <TeamComparison
                leftUserId={volodymyrId}
                rightUserId={khrystynaId}
                raceWeeks={completedRaceWeeksIds}
            />
        </div>
    );
};
