import type { TeamOwnerType } from '@/feature/team-owner-switch';

import { BuildTeamView } from '../../ui';

import { getUserFantasyTeam, useGeneratedTeamBuilderStore } from '../../model';

type CurrentBuildTeamProps = {
    userId: TeamOwnerType;
};

export const CurrentBuildTeam = ({ userId }: CurrentBuildTeamProps) => {
    const fantasyUserTeam = useGeneratedTeamBuilderStore((state) =>
        getUserFantasyTeam(state, userId),
    );

    if (!fantasyUserTeam) {
        return null;
    }

    return <BuildTeamView team={fantasyUserTeam} />;
};
