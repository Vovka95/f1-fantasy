import type { TeamComparisonChartMode } from './team-comparison.types';

export const TEAM_COMPARISON_CHART_MODE_LABELS: Record<
    TeamComparisonChartMode,
    string
> = {
    racePoints: 'Race Points',
    totalPoints: 'Total Points',
    raceRank: 'Race Rank',
    totalRank: 'Total Rank',
};
