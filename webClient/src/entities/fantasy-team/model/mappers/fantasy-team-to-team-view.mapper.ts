import type { PlayerPreview } from '@/entities/player';

import type { FantasyUserTeam } from '../../api/fantasy-team-response.type';

import type { FantasyTeamViewModel } from '../types';

import { mapFantasyTeamSummaryView } from './fantasy-team-to-team-sammary.mapper';
import { mapFantasyTeamLineupView } from './fantasy-team-to-team-lineup.mapper';

export const mapFantasyTeamToView = (
    fantasyTeam: FantasyUserTeam,
    playersPreview: PlayerPreview[],
): FantasyTeamViewModel => {
    const players = mapFantasyTeamLineupView(fantasyTeam, playersPreview);
    const summary = mapFantasyTeamSummaryView(fantasyTeam, playersPreview);

    return {
        id: String(fantasyTeam.socialId),
        players,
        summary,
    };
};
