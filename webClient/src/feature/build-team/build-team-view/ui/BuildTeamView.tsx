import { BuildTeamSummary } from './BuildTeamSummary';
import { BuildTeam } from './BuildTeam';

import type {
    BuildTeamPlayerPreviewCardModel,
    BuildTeamViewModel,
} from '../model/build-team-view.types';

type BuildTeamViewProps = BuildTeamViewModel & BuildTeamPlayerPreviewCardModel;

export const BuildTeamView = ({
    drivers,
    constructors,
    overallPoints,
    calculatedPoints,
    onCaptainChange,
    onRemovePlayer,
    mode,
}: BuildTeamViewProps) => {
    return (
        <div className="flex gap-6 p-3 rounded-md">
            <BuildTeam
                drivers={drivers}
                constructors={constructors}
                onCaptainChange={onCaptainChange}
                onRemovePlayer={onRemovePlayer}
                mode={mode}
            />
            <BuildTeamSummary
                overallPoints={overallPoints}
                calculatedPoints={calculatedPoints}
            />
        </div>
    );
};
