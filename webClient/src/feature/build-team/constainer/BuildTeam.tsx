import { usePlayersQuery } from '@/entities/player';
import { useFantasyTeamQuery } from '@/entities/fantasy-team';
import type { TeamOwnerType } from '@/feature/team-owner-switch';

import { Divider, FullPageLoader } from '@/shared/ui';

import { CurrentBuildTeam } from '../current-build-team';
import { TeamBuilderForm } from '../team-builder';
import { GeneratedBuildTeamList } from '../generated-build-team';

type BuildTeamProps = {
    userId: TeamOwnerType;
    raceWeek: number;
};

export const BuildTeam = ({ userId, raceWeek }: BuildTeamProps) => {
    const playersQuery = usePlayersQuery({ raceWeek });

    const fantasyTeamQuery = useFantasyTeamQuery({
        raceWeek,
        userId,
    });

    if (
        playersQuery.isLoading ||
        fantasyTeamQuery.isLoading ||
        !playersQuery.data ||
        !fantasyTeamQuery.data
    ) {
        return <FullPageLoader />;
    }

    return (
        <div className="flex gap-10 h-full min-h-0 overflow-hidden">
            <div className="flex flex-1 flex-col gap-2 min-h-0 overflow-hidden">
                <CurrentBuildTeam userId={userId} />

                <Divider />

                <GeneratedBuildTeamList userId={userId} />
            </div>

            <div className="flex flex-1 flex-col gap-2 min-h-0 overflow-hidden">
                <TeamBuilderForm
                    userId={userId}
                    fantasyUserTeam={fantasyTeamQuery.data}
                    playersPreview={playersQuery.data.preview}
                />
            </div>
        </div>
    );
};
