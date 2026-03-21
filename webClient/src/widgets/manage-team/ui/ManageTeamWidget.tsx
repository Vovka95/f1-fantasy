import { usePlayersQuery } from '@/entities/player';
import { useFantasyTeamQuery } from '@/entities/fantasy-team';
import type { TeamOwnerType } from '@/feature/team-owner-switch';

import {
    CurrentBuildTeam,
    GeneratedBuildTeamList,
    TeamBuilderForm,
} from '@/feature/manage-team';

import { Divider, FullPageLoader } from '@/shared/ui';

type ManageTeamWidgetProps = {
    userId: TeamOwnerType;
    raceWeek: number;
};

export const ManageTeamWidget = ({
    userId,
    raceWeek,
}: ManageTeamWidgetProps) => {
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
        <div className="grid h-full min-h-0 overflow-hidden gap-6 grid-cols-[60fr_40fr] 2xl:grid-cols-2">
            <div className="flex flex-col gap-2 min-h-0 w-full overflow-hidden">
                <CurrentBuildTeam userId={userId} />

                <Divider />

                <GeneratedBuildTeamList userId={userId} />
            </div>

            <div className="flex flex-col gap-2 min-h-0 w-full overflow-hidden">
                <TeamBuilderForm
                    userId={userId}
                    fantasyUserTeam={fantasyTeamQuery.data}
                    playersPreview={playersQuery.data.preview}
                />
            </div>
        </div>
    );
};
