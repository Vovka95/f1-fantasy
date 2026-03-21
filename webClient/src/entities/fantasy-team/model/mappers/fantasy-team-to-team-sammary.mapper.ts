import type { FantasyUserTeam } from '../../api/fantasy-team-response.type';

import { MAX_ALLOWED_TRANSFERS } from '../constants';
import type { FantasyTeamSummaryModel } from '../types';

export const mapFantasyTeamSummaryView = (
    fantasyTeam: FantasyUserTeam,
): FantasyTeamSummaryModel => {
    const transfersCount = fantasyTeam?.usersubs ?? 0;
    const freeTransfers = fantasyTeam?.subsallowed ?? MAX_ALLOWED_TRANSFERS;

    const extraTransfers = Math.max(0, transfersCount - freeTransfers);

    return {
        overallPoints: fantasyTeam.ovpoints ?? 0,
        grandPrixPoints: fantasyTeam.gdpoints ?? 0,
        remainingBudget: fantasyTeam.team_info.teamBal,
        budget: fantasyTeam.team_info.maxTeambal,
        transfersCount,
        extraTransfers,
    };
};
