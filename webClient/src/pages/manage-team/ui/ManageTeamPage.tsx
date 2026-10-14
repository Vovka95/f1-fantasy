import { useState } from 'react';

import {
    TeamOwnerSwitch,
    volodymyrId,
    type TeamOwnerType,
} from '@/feature/team-owner-switch';
import {
    useActiveRaceWeek,
    useLastCompletedRaceWeek,
} from '@/entities/game-days';

import { ManageTeamWidget } from '@/widgets/manage-team';

import { FullPageLoader } from '@/shared/ui';

export const ManageTeamPage = () => {
    const [userId, setUserId] = useState<TeamOwnerType>(volodymyrId);
    const { lastCompletedRaceWeekId } = useLastCompletedRaceWeek();
    const { activeRaceWeekId } = useActiveRaceWeek();

    if (!activeRaceWeekId || !lastCompletedRaceWeekId) {
        return <FullPageLoader />;
    }

    return (
        <div className="flex w-full h-full justify-center">
            <div className="flex flex-col w-full h-full max-w-400 gap-4 overflow-hidden">
                <header className="flex gap-2 w-full justify-end">
                    <TeamOwnerSwitch value={userId} onValueChange={setUserId} />
                </header>

                <section className="flex-1 min-h-0">
                    <ManageTeamWidget
                        userId={userId}
                        lastCompletedRaceWeekId={lastCompletedRaceWeekId}
                        activeRaceWeekId={activeRaceWeekId}
                    />
                </section>
            </div>
        </div>
    );
};
