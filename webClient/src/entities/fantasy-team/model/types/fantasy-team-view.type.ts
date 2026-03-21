import type { FantasyTeamLineupModel } from './fantasy-team-lineup.type';
import type { FantasyTeamSummaryModel } from './fantasy-team-summary.type';

export type FantasyTeamViewModel = {
    id: string;
    players: FantasyTeamLineupModel;
    summary: FantasyTeamSummaryModel;
};
