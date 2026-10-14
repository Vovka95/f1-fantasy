import type { PlayerPreview } from '@/entities/player';
import type { FantasyUserTeam } from '../../api/fantasy-team-response.type';

import { MAX_ALLOWED_TRANSFERS } from '../constants';
import type { FantasyTeamSummaryModel } from '../types';
import { calculateFantasyTeamBudget } from '../utils';

export const mapFantasyTeamSummaryView = (
    fantasyTeam: FantasyUserTeam,
    playersPreview: PlayerPreview[],
): FantasyTeamSummaryModel => {
    const transfersCount = fantasyTeam?.usersubs ?? 0;
    const freeTransfers = fantasyTeam?.subsallowed ?? MAX_ALLOWED_TRANSFERS;

    const extraTransfers = Math.max(0, transfersCount - freeTransfers);

    const budget = calculateFantasyTeamBudget(fantasyTeam, playersPreview);

    return {
        overallPoints: fantasyTeam.ovpoints ?? 0,
        grandPrixPoints: fantasyTeam.gdpoints ?? 0,
        remainingBudget: fantasyTeam.team_info.teamBal,
        budget: budget, //fantasyTeam.team_info.maxTeambal,
        transfersCount,
        extraTransfers,
    };
};
