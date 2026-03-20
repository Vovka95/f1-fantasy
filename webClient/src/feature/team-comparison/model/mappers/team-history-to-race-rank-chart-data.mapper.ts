import type { FantasyTeamHistoryItem } from '@/entities/fantasy-team';
import type { TeamComparisonChartPoint } from '../team-comparison.types';

export const mapFantasyTeamsHistoryToRaceRankChartData = (
    leftTeamHistory: FantasyTeamHistoryItem[],
    rightTeamHistory: FantasyTeamHistoryItem[],
): TeamComparisonChartPoint[] => {
    const raceWeeks = Array.from(
        new Set([
            ...leftTeamHistory.map((item) => item.raceWeek),
            ...rightTeamHistory.map((item) => item.raceWeek),
        ]),
    ).sort((a, b) => a - b);

    const data = raceWeeks.map((raceWeek) => {
        const leftTeam = leftTeamHistory.find(
            (item) => item.raceWeek === raceWeek,
        );
        const rightTeam = rightTeamHistory.find(
            (item) => item.raceWeek === raceWeek,
        );

        return {
            raceWeek,
            team1Points: leftTeam?.team.gdrank ?? 0,
            team2Points: rightTeam?.team.gdrank ?? 0,
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

    return data;
};
