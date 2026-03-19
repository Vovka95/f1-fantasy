import { useState } from 'react';

import { CurrentBuildTeam } from '@/feature/build-team/current-build-team';
import { TeamBuilderForm } from '@/feature/build-team/team-builder';
import { GeneratedBuildTeamList } from '@/feature/build-team/generated-build-team';

import {
    TeamOwnerSwitch,
    volodymyrId,
    type TeamOwnerType,
} from '@/feature/team-owner-switch';

import { Divider } from '@/shared/ui';

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
                <div className="flex gap-10 h-full min-h-0 overflow-hidden">
                    <div className="flex flex-1 flex-col gap-2 min-h-0 overflow-hidden">
                        <CurrentBuildTeam userId={userId} raceWeek={raceWeek} />

                        <Divider />

                        <GeneratedBuildTeamList userId={userId} />
                    </div>

                    <div className="flex flex-1 flex-col gap-2 min-h-0 overflow-hidden">
                        <TeamBuilderForm userId={userId} raceWeek={raceWeek} />
                    </div>
                </div>
            </section>
        </div>
    );
};
