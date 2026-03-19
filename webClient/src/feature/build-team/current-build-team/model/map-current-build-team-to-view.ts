import type { PlayerPreview } from '@/entities/player';
import type { FantasyUserTeam } from '@/entities/fantasy-team';

import type { BuildTeamViewModel } from '../../model';

type MapCurrentBuildTeamToViewParams = {
    fantasyTeam: FantasyUserTeam;
    playersPreview: PlayerPreview[];
};

export const mapCurrentBuildTeamToView = ({
    fantasyTeam,
    playersPreview,
}: MapCurrentBuildTeamToViewParams): BuildTeamViewModel => {
    const teamPlayers = fantasyTeam.playerid.map((tp) => {
        return {
            preview: playersPreview.find(
                (p) => tp.id === p.id,
            ) as PlayerPreview,
            raceInfo: tp,
        };
    });

    const sortedTeamPlayers = teamPlayers.sort(
        (a, b) => a.raceInfo.playerpostion - b.raceInfo.playerpostion,
    );

    const drivers = sortedTeamPlayers.filter(
        (p) => p.preview.positionName === 'DRIVER',
    );

    const constructors = sortedTeamPlayers.filter(
        (p) => p.preview.positionName === 'CONSTRUCTOR',
    );

    const calculatedPoints = [...drivers, ...constructors].reduce((a, b) => {
        const playerPoints = b.raceInfo.iscaptain
            ? b.preview.overallPoints * 2
            : b.preview.overallPoints;

        return a + playerPoints;
    }, 0);

    return {
        id: `${fantasyTeam.socialId}`,
        players: {
            drivers,
            constructors,
        },
        summary: {
            overallPoints: fantasyTeam.ovpoints,
            calculatedPoints,
            remainingBudget: fantasyTeam.team_info.teamBal,
        },
    };
};
