import type { FantasyTeamHistoryItem } from '@/entities/fantasy-team';

import { mapFantasyTeamsHistoryToRacePointsChartData } from './teams-history-to-race-points-chart-data.mapper';
import { mapFantasyTeamsHistoryToTotalPointsChartData } from './teams-history-to-total-points-chart-data.mapper';
import { mapFantasyTeamsHistoryToTotalRankChartData } from './team-history-to-total-rank-chart-data.mapper';
import { mapFantasyTeamsHistoryToRaceRankChartData } from './team-history-to-race-rank-chart-data.mapper';
import { mapScheduleToChartPoint } from './schedule-to-race-chart-data.mapper';

import type {
    TeamComparisonChartMode,
    TeamComparisonChartPoint,
} from '../team-comparison.types';
import type { F1ScheduleMeeting } from '@/entities/schedule';

export const mapFantasyTeamsHistoryToChartData = ({
    leftTeamHistory,
    rightTeamHistory,
    scheduleData,
    mode,
}: {
    leftTeamHistory: FantasyTeamHistoryItem[];
    rightTeamHistory: FantasyTeamHistoryItem[];
    scheduleData: F1ScheduleMeeting[];
    mode: TeamComparisonChartMode;
}): TeamComparisonChartPoint[] => {
    let points: TeamComparisonChartPoint[] = [];

    if (mode === 'totalPoints') {
        points = mapFantasyTeamsHistoryToTotalPointsChartData(
            leftTeamHistory,
            rightTeamHistory,
        );
    } else if (mode === 'racePoints') {
        points = mapFantasyTeamsHistoryToRacePointsChartData(
            leftTeamHistory,
            rightTeamHistory,
        );
    } else if (mode === 'totalRank') {
        points = mapFantasyTeamsHistoryToTotalRankChartData(
            leftTeamHistory,
            rightTeamHistory,
        );
    } else {
        points = mapFantasyTeamsHistoryToRaceRankChartData(
            leftTeamHistory,
            rightTeamHistory,
        );
    }

    return mapScheduleToChartPoint(points, scheduleData);
};
