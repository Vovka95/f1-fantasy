import type { PlayerPreview } from '@/entities/player';

import type { FantasyUserTeam } from '../../api/fantasy-team-response.type';
import type { TeamPlayer } from '../types';

export const mapFantasyTeamLineupView = (
    fantasyTeam: FantasyUserTeam,
    playersPreview: PlayerPreview[],
) => {
    const teamPlayers: TeamPlayer[] = fantasyTeam.playerid.map((tp) => {
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

    return {
        drivers,
        constructors,
    };
};
