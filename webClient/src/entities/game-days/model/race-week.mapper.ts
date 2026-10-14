import type {
    FantasyTeamOverview,
    MatchdayDetails,
} from '../api/game-days-response.type';
import type { RaceWeekDetailsType, RaceWeeksType } from './race-weeks.type';

const mapRaceWeeksToOptions = (
    mddetails: MatchdayDetails,
): RaceWeekDetailsType[] => {
    return Object.entries(mddetails)
        .map(([key, value]) => {
            const raceWeekId = Number(key);

            return {
                raceWeekId,
                points: value.pts,
                mds: value.mds,
                phId: value.phId,
            };
        })
        .filter((option) => option.mds !== 0);
};

export const mapToRaceWeeks = (
    raceDaysOverview: FantasyTeamOverview,
): RaceWeeksType => {
    const completedRaceWeekOptions = mapRaceWeeksToOptions(
        raceDaysOverview.mddetails,
    );

    return {
        activeRaceWeekId: raceDaysOverview.cumdid,
        lastCompletedRaceWeekId:
            completedRaceWeekOptions[completedRaceWeekOptions.length - 1]
                .raceWeekId,
        raceWeekSeries: completedRaceWeekOptions,
    };
};
