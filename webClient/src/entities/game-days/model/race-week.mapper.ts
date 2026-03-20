import type {
    FantasyTeamOverview,
    MatchdayDetails,
} from '../api/game-days-response.type';
import type { RaceWeekDetailsType, RaceWeeksType } from './race-weeks.type';

const mapRaceWeeksToOptions = (
    mddetails: MatchdayDetails,
): RaceWeekDetailsType[] => {
    return Object.entries(mddetails).map(([key, value]) => {
        const raceWeekId = Number(key);

        return {
            raceWeekId,
            points: value.pts,
            mds: value.mds,
            phId: value.phId,
        };
    });
};

export const mapToRaceWeeks = (
    raceDaysOverview: FantasyTeamOverview,
): RaceWeeksType => {
    return {
        activeRaceWeekId: raceDaysOverview.cumdid,
        raceWeekSeries: mapRaceWeeksToOptions(raceDaysOverview.mddetails),
    };
};
