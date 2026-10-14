import type { FantasyUserTeam, TeamPlayer } from '@/entities/fantasy-team';
import type { PlayerPreview } from '@/entities/player';

export const calculateFantasyTeamBudget = (
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

    const squadPrice = teamPlayers.reduce(
        (total, player) => total + player.preview.value,
        0,
    );

    return Number((fantasyTeam.team_info.teamBal + squadPrice).toFixed(1));
};
