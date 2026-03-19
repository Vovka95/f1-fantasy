import { useState } from 'react';

import {
    TeamOwnerSwitch,
    volodymyrId,
    type TeamOwnerType,
} from '@/feature/team-owner-switch';

import { BuildTeam } from '@/feature/build-team';

export const BuildTeamPage = () => {
    const [userId, setUserId] = useState<TeamOwnerType>(volodymyrId);
    // TODO: Make query to get getusergamedaysv1 with raceWeek id.
    const raceWeek = 3;

    return (
        <div className="flex flex-col h-full gap-4 overflow-hidden">
            <header className="flex gap-2 justify-end">
                <TeamOwnerSwitch value={userId} onValueChange={setUserId} />
            </header>

            <section className="flex-1 min-h-0">
                <BuildTeam userId={userId} raceWeek={raceWeek} />
            </section>
        </div>
    );
};
