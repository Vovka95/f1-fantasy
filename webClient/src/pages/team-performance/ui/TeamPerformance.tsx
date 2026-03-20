import { useGameDaysQuery } from '@/entities/game-days';
import { volodymyrId } from '@/feature/team-owner-switch';

import { FullPageLoader } from '@/shared/ui';

export const TeamPerformance = () => {
    const gameDaysQuery = useGameDaysQuery({ userId: volodymyrId });

    if (!gameDaysQuery.data || gameDaysQuery.isLoading) {
        return <FullPageLoader />;
    }

    return (
        <div className="flex flex-col gap-3">
            <h3>Team Performance</h3>
            <div className="grid grid-cols-2 gap-4"></div>
        </div>
    );
};
