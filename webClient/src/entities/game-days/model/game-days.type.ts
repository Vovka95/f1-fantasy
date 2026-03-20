import type { FantasyTeamOverview } from '../api/game-days-response.type';
import type { RaceWeeksType } from './race-weeks.type';

export type GameDaysType = {
    raceWeeks: RaceWeeksType;
    other: FantasyTeamOverview;
};
