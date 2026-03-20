import { useState } from 'react';

import {
    TeamOwnerSwitch,
    volodymyrId,
    type TeamOwnerType,
} from '@/feature/team-owner-switch';
import { BuildTeam } from '@/feature/build-team';
import { useGameDaysQuery } from '@/entities/game-days';

import { FullPageLoader } from '@/shared/ui';

export const ManageTeamPage = () => {
    const [userId, setUserId] = useState<TeamOwnerType>(volodymyrId);
    const { data, isLoading } = useGameDaysQuery({ userId });

    if (!data || isLoading) {
        return <FullPageLoader />;
    }

    return (
        <div className="flex flex-col h-full gap-4 overflow-hidden">
            <header className="flex gap-2 justify-end">
                <TeamOwnerSwitch value={userId} onValueChange={setUserId} />
            </header>

            <section className="flex-1 min-h-0">
                <BuildTeam
                    userId={userId}
                    raceWeek={data.raceWeeks.activeRaceWeekId}
                />
            </section>
        </div>
    );
};
