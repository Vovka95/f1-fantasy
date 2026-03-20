import type { FantasyTeamOverview } from '../api/game-days-response.type';
import type { GameDaysType } from './game-days.type';
import { mapToRaceWeeks } from './race-week.mapper';

export const mapGameDaysTeam = (
    raceDaysOverview: FantasyTeamOverview,
): GameDaysType => {
    return {
        raceWeeks: mapToRaceWeeks(raceDaysOverview),
        other: raceDaysOverview,
    };
};
