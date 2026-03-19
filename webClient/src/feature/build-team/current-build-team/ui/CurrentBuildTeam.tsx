import { useMemo } from 'react';

import { type PlayerPreview } from '@/entities/player';
import { type FantasyUserTeam } from '@/entities/fantasy-team';

import { BuildTeamView } from '../../ui';

import { mapCurrentBuildTeamToView } from '../model/map-current-build-team-to-view';

type CurrentBuildTeamProps = {
    userId: string;
    playersPreview: PlayerPreview[];
    fantasyUserTeam: FantasyUserTeam;
};

export const CurrentBuildTeam = ({
    userId,
    playersPreview,
    fantasyUserTeam,
}: CurrentBuildTeamProps) => {
    const viewModel = useMemo(() => {
        return mapCurrentBuildTeamToView({
            fantasyTeam: fantasyUserTeam,
            playersPreview: playersPreview,
        });
    }, [playersPreview, fantasyUserTeam]);

    return <BuildTeamView team={viewModel} />;
};
