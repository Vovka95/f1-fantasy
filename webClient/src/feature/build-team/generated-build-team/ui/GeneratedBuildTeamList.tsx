import type { TeamOwnerType } from '@/feature/team-owner-switch';

import { BuildTeamView } from '../../ui';

import {
    getUserGeneratedTeams,
    useGeneratedTeamBuilderStore,
} from '../../model';

type GeneratedBuildTeamListProps = {
    userId: TeamOwnerType;
};

export const GeneratedBuildTeamList = ({
    userId,
}: GeneratedBuildTeamListProps) => {
    const teams = useGeneratedTeamBuilderStore((state) =>
        getUserGeneratedTeams(state, userId),
    );

    const removeTeam = useGeneratedTeamBuilderStore(
        (state) => state.removeTeam,
    );

    const onRemoveTeam = (teamId: string) => {
        removeTeam(userId, teamId);
    };

    return (
        <div className="flex flex-1 flex-col gap-2 min-h-0 overflow-auto">
            {teams.map((team) => {
                return (
                    <BuildTeamView
                        key={team.id}
                        team={team}
                        teamAction={{
                            mode: 'editable',
                            onRemoveTeam: onRemoveTeam,
                        }}
                    />
                );
            })}
        </div>
    );
};
