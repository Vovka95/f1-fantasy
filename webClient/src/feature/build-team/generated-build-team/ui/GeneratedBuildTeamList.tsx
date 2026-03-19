import type { TeamOwnerType } from '@/feature/team-owner-switch';

import { BuildTeamView } from '../../ui';

import { useGeneratedTeamBuilderStore } from '../../team-builder';
import { getUserGeneratedTeams } from '../../team-builder/model/team-builder.selectors';

type GeneratedBuildTeamListProps = {
    userId: TeamOwnerType;
};

export const GeneratedBuildTeamList = ({
    userId,
}: GeneratedBuildTeamListProps) => {
    const removeTeam = useGeneratedTeamBuilderStore(
        (state) => state.removeTeam,
    );

    const teams = useGeneratedTeamBuilderStore((state) =>
        getUserGeneratedTeams(state, userId),
    );

    return (
        <div className="flex flex-1 flex-col gap-2 min-h-0 overflow-auto">
            {teams.map((team) => {
                return (
                    <BuildTeamView
                        key={team.id}
                        team={team}
                        teamAction={{
                            mode: 'editable',
                            onRemoveTeam: (teamId: string) =>
                                removeTeam(userId, teamId),
                        }}
                    />
                );
            })}
        </div>
    );
};
