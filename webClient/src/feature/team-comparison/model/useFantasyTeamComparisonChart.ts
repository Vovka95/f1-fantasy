import { useMemo } from 'react';

import { useFantasyTeamHistoryQuery } from '@/entities/fantasy-team';
import type { TeamOwnerType } from '@/feature/team-owner-switch';
import { useF1ScheduleQuery } from '@/entities/schedule';

import type { TeamComparisonChartMode } from './team-comparison.types';
import { mapFantasyTeamsHistoryToChartData } from './mappers';

type UseFantasyTeamsComparisonChartParams = {
    leftUserId?: TeamOwnerType;
    rightUserId?: TeamOwnerType;
    raceWeeks?: number[];
    mode: TeamComparisonChartMode;
};

export const useFantasyTeamsComparisonChart = ({
    leftUserId,
    rightUserId,
    raceWeeks,
    mode,
}: UseFantasyTeamsComparisonChartParams) => {
    const leftHistory = useFantasyTeamHistoryQuery({
        userId: leftUserId,
        raceWeeks,
    });

    const rightHistory = useFantasyTeamHistoryQuery({
        userId: rightUserId,
        raceWeeks,
    });

    const scheduleQuery = useF1ScheduleQuery();

    const data = useMemo(() => {
        if (!leftHistory.data || !rightHistory.data || !scheduleQuery.data) {
            return [];
        }

        return mapFantasyTeamsHistoryToChartData({
            leftTeamHistory: leftHistory.data,
            rightTeamHistory: rightHistory.data,
            scheduleData: scheduleQuery.data,
            mode,
        });
    }, [leftHistory.data, rightHistory.data, scheduleQuery.data, mode]);

    return {
        data,
        isLoading:
            leftHistory.isLoading ||
            rightHistory.isLoading ||
            scheduleQuery.isLoading,
        isFetching:
            leftHistory.isFetching ||
            rightHistory.isFetching ||
            scheduleQuery.isFetching,
        isError:
            leftHistory.isError ||
            rightHistory.isError ||
            scheduleQuery.isError,
        leftHistory,
        rightHistory,
        leftTeamName: decodeURIComponent(leftHistory.data[0]?.team.teamname),
        rightTeamName: decodeURIComponent(rightHistory.data[0]?.team.teamname),
    };
};
