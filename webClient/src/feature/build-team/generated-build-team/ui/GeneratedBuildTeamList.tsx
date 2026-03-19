import type { TeamOwnerType } from '@/feature/team-owner-switch';
import { useGeneratedTeamBuilderStore } from '../../team-builder';
import { getUserGeneratedTeams } from '../../team-builder/model/team-builder.selectors';
import { GeneratedBuildTeam } from './GeneratedBuildTeam';

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
                    <GeneratedBuildTeam
                        key={team.id}
                        drivers={team.drivers}
                        constructors={team.constructors}
                        calculatedPoints={team.calculatedPoints}
                        remainingBudget={team.remainingBudget}
                        teamId={team.id}
                        onRemoveTeam={(teamId: string) =>
                            removeTeam(userId, teamId)
                        }
                    />
                );
            })}
        </div>
    );
};
