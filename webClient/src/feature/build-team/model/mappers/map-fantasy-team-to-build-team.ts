import type { PlayerPreview } from '@/entities/player';
import type { FantasyUserTeam } from '@/entities/fantasy-team';

import type { BuildTeamViewModel } from '../types';

import { calculatePoints } from './mapper.helper';
import {
    MAX_ALLOWED_TRANSFERS,
    PENALTY_FOR_EXTRA_TRANSFER,
} from '../constants';

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
    const freeTransfers = fantasyTeam?.subsallowed ?? MAX_ALLOWED_TRANSFERS;

    const extraTransfers = Math.max(0, transfersCount - freeTransfers);

    const penaltyPerTransfer =
        fantasyTeam?.extrasubscost ?? PENALTY_FOR_EXTRA_TRANSFER;
    const penalty = extraTransfers * penaltyPerTransfer;

    const pointsWithAdditionalTransfers = calculatedPoints - penalty;

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
            extraTransfers,
            pointsWithAdditionalTransfers,
        },
    };
};
