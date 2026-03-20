import type { FantasyUserTeam } from '../api/fantasy-team-response.type';

export type FantasyTeamHistoryItem = {
    raceWeek: number;
    team: FantasyUserTeam;
};
