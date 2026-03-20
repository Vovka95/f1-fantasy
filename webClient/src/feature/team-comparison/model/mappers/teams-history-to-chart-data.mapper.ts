import type { FantasyTeamHistoryItem } from '@/entities/fantasy-team';

import { mapFantasyTeamsHistoryToRacePointsChartData } from './teams-history-to-race-points-chart-data.mapper';
import { mapFantasyTeamsHistoryToTotalPointsChartData } from './teams-history-to-total-points-chart-data.mapper';
import { mapFantasyTeamsHistoryToTotalRankChartData } from './team-history-to-total-rank-chart-data.mapper';
import { mapFantasyTeamsHistoryToRaceRankChartData } from './team-history-to-race-rank-chart-data.mapper';

import type {
    TeamComparisonChartMode,
    TeamComparisonChartPoint,
} from '../team-comparison.types';

export const mapFantasyTeamsHistoryToChartData = ({
    leftTeamHistory,
    rightTeamHistory,
    mode,
}: {
    leftTeamHistory: FantasyTeamHistoryItem[];
    rightTeamHistory: FantasyTeamHistoryItem[];
    mode: TeamComparisonChartMode;
}): TeamComparisonChartPoint[] => {
    if (mode === 'totalPoints') {
        return mapFantasyTeamsHistoryToTotalPointsChartData(
            leftTeamHistory,
            rightTeamHistory,
        );
    }

    if (mode === 'racePoints') {
        return mapFantasyTeamsHistoryToRacePointsChartData(
            leftTeamHistory,
            rightTeamHistory,
        );
    }

    if (mode === 'totalRank') {
        return mapFantasyTeamsHistoryToTotalRankChartData(
            leftTeamHistory,
            rightTeamHistory,
        );
    }

    return mapFantasyTeamsHistoryToRaceRankChartData(
        leftTeamHistory,
        rightTeamHistory,
    );
};
