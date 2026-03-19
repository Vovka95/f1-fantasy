import { useMemo } from 'react';

import { usePlayersQuery } from '@/entities/player';
import { useFantasyTeamQuery } from '@/entities/fantasy-team';

import { BuildTeamView } from '../../ui';

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

    const viewModel = useMemo(() => {
        if (!playersQuery.data || !fantasyTeamQuery.data) {
            return null;
        }

        return mapCurrentBuildTeamToView({
            fantasyTeam: fantasyTeamQuery.data!,
            playersPreview: playersQuery.data!.preview,
        });
    }, [playersQuery.data, fantasyTeamQuery.data]);

    if (!viewModel) {
        return null;
    }

    return <BuildTeamView team={viewModel} />;
};
