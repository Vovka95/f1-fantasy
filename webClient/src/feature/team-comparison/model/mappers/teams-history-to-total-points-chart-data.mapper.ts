import type { FantasyTeamHistoryItem } from '@/entities/fantasy-team';
import type { TeamComparisonChartPoint } from '../team-comparison.types';

export const mapFantasyTeamsHistoryToTotalPointsChartData = (
    leftTeamHistory: FantasyTeamHistoryItem[],
    rightTeamHistory: FantasyTeamHistoryItem[],
): TeamComparisonChartPoint[] => {
    const raceWeeks = Array.from(
        new Set([
            ...leftTeamHistory.map((item) => item.raceWeek),
            ...rightTeamHistory.map((item) => item.raceWeek),
        ]),
    ).sort((a, b) => a - b);

    let leftTotal = 0;
    let rightTotal = 0;

    const data = raceWeeks.map((raceWeek) => {
        const leftTeam = leftTeamHistory.find(
            (item) => item.raceWeek === raceWeek,
        );
        const rightTeam = rightTeamHistory.find(
            (item) => item.raceWeek === raceWeek,
        );

        leftTotal += leftTeam?.team.gdpoints ?? 0;
        rightTotal += rightTeam?.team.gdpoints ?? 0;

        return {
            raceWeek,
            team1Points: leftTotal,
            team2Points: rightTotal,
        };
    });

    return [
        {
            raceWeek: 0,
            team1Points: 0,
            team2Points: 0,
        },
        ...data,
    ];
};
