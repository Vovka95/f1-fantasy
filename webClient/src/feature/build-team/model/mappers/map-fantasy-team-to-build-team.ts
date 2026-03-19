import type { PlayerPreview } from '@/entities/player';
import type { FantasyUserTeam } from '@/entities/fantasy-team';

import type { BuildTeamViewModel } from '../types';

import { calculatePoints } from './mapper.helper';

type MapCurrentBuildTeamToViewParams = {
    fantasyTeam: FantasyUserTeam;
    playersPreview: PlayerPreview[];
};

export const mapFantasyTeamToView = ({
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

    const calculatedPoints = calculatePoints([...drivers, ...constructors]);

    const transfersCount = fantasyTeam?.usersubs ?? 0;

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
            transfersCount,
        },
    };
};
