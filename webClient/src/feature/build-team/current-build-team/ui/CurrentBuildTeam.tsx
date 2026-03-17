import { usePlayersQuery } from '@/entities/player';
import { useFantasyTeamQuery } from '@/entities/fantasy-team';

import { BuildTeamView } from '../../build-team-view';

import { mapCurrentBuildTeamToView } from '../model/map-current-build-team-to-view';

type CurrentBuildTeamProps = {
    userId: string;
    raceWeek: number;
};

export const CurrentBuildTeam = ({
    userId,
    raceWeek,
}: CurrentBuildTeamProps) => {
    const playersQuery = usePlayersQuery({ raceWeek });

    const fantasyTeamQuery = useFantasyTeamQuery({
        raceWeek,
        userId,
    });

    const isLoading = fantasyTeamQuery.isLoading || playersQuery.isLoading;
    const isError = fantasyTeamQuery.isError || playersQuery.isError;

    if (isLoading) {
        return null;
    }

    if (isError) {
        return null;
    }

    const viewModel = mapCurrentBuildTeamToView({
        fantasyTeam: fantasyTeamQuery.data!,
        playersPreview: playersQuery.data!.preview,
    });

    return (
        <BuildTeamView
            drivers={viewModel.drivers}
            constructors={viewModel.constructors}
            calculatedPoints={viewModel.calculatedPoints}
            overallPoints={viewModel.overallPoints}
            mode="readonly"
        />
    );
};
