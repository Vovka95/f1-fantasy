export type TeamComparisonChartMode =
    | 'racePoints'
    | 'totalPoints'
    | 'raceRank'
    | 'totalRank';

export type TeamComparisonChartPoint = {
    raceWeek: number;
    team1Points: number;
    team2Points: number;
    flagImageUrl?: string;
};
