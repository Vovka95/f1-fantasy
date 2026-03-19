import { BuildTeamSummary } from './BuildTeamSummary';
import { BuildTeamPlayersGrid } from './BuildTeamPlayersGrid';
import { BuildTeamAction } from './BuildTeamAction';

import type {
    BuildTeamActionModel,
    BuildTeamEmptySlotActionModel,
    BuildTeamPlayerActionModel,
    BuildTeamViewModel,
} from '../../model';

type BuildTeamViewProps = {
    team: BuildTeamViewModel;
    teamAction?: BuildTeamActionModel;
    playerAction?: BuildTeamPlayerActionModel;
    emptySlotActions?: BuildTeamEmptySlotActionModel;
};

const DEFAULT_ACTION_MODE = 'readonly';

export const BuildTeamView = ({
    team,
    teamAction = { mode: DEFAULT_ACTION_MODE },
    playerAction = { mode: DEFAULT_ACTION_MODE },
    emptySlotActions = { mode: DEFAULT_ACTION_MODE },
}: BuildTeamViewProps) => {
    return (
        <div className="grid grid-cols-[minmax(0,1fr)_200px] gap-6 p-3 rounded-md">
            <BuildTeamPlayersGrid
                players={team.players}
                playerActions={playerAction}
                emptySlotActions={emptySlotActions}
            />

            <div className="flex flex-col gap-2">
                {teamAction.mode === 'editable' && (
                    <BuildTeamAction
                        teamId={team.id}
                        onEditTeam={teamAction.onEditTeam}
                        onRemoveTeam={teamAction.onRemoveTeam}
                        mode={teamAction.mode}
                    />
                )}

                <BuildTeamSummary summary={team.summary} />
            </div>
        </div>
    );
};
