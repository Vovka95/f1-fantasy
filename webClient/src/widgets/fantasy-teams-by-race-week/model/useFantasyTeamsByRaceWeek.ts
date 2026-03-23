import { useMemo } from 'react';

import {
    mapFantasyTeamHistoryToView,
    useFantasyTeamHistoryQuery,
} from '@/entities/fantasy-team';
import { usePlayersHistoryQuery } from '@/entities/player';
import { useF1ScheduleQuery } from '@/entities/schedule';
import type { TeamOwnerType } from '@/feature/team-owner-switch';

type UseFantasyTemsByRaceWeekParams = {
    leftUserId: TeamOwnerType;
    rightUserId: TeamOwnerType;
    raceWeeks: number[];
};

export const useFantasyTeamsByRaceWeek = ({
    leftUserId,
    rightUserId,
    raceWeeks,
}: UseFantasyTemsByRaceWeekParams) => {
    const leftTeamHistory = useFantasyTeamHistoryQuery({
        userId: leftUserId,
        raceWeeks,
    });

    const rightTeamHistory = useFantasyTeamHistoryQuery({
        userId: rightUserId,
        raceWeeks,
    });

    const playersHistory = usePlayersHistoryQuery({ raceWeeks });

    const f1ScheduleQuery = useF1ScheduleQuery();

    const isLoading =
        f1ScheduleQuery.isLoading ||
        leftTeamHistory.isLoading ||
        rightTeamHistory.isLoading ||
        playersHistory.isLoading ||
        !f1ScheduleQuery.data ||
        !rightTeamHistory.data ||
        !leftTeamHistory.data ||
        !playersHistory.data;

    const teamViewsList = useMemo(() => {
        if (isLoading) {
            return [];
        }

        const leftTeamData = mapFantasyTeamHistoryToView(
            leftTeamHistory.data,
            playersHistory.data,
        );

        const rightTeamData = mapFantasyTeamHistoryToView(
            rightTeamHistory.data,
            playersHistory.data,
        );

        return [...raceWeeks].reverse().map((raceWeekId) => {
            const leftTeam = leftTeamData.find(
                (team) => team.raceWeek === raceWeekId,
            );
            const rightTeam = rightTeamData.find(
                (team) => team.raceWeek === raceWeekId,
            );

            const raceWeekInfo = f1ScheduleQuery.data?.find(
                (race) => race.meetingNumber === raceWeekId,
            );

            return {
                raceWeekId,
                teamViews: [leftTeam?.playersView!, rightTeam?.playersView!],
                raceWeekInfo,
            };
        });
    }, [
        f1ScheduleQuery.data,
        rightTeamHistory.data,
        leftTeamHistory.data,
        playersHistory.data,
        isLoading,
    ]);

    return {
        data: teamViewsList,
        isLoading,
    };
};
