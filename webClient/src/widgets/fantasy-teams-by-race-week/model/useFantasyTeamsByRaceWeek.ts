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
        leftTeamHistory.isLoading ||
        rightTeamHistory.isLoading ||
        playersHistory.isLoading ||
        f1ScheduleQuery.isLoading;

    const hasRequiredData =
        !!leftTeamHistory.data &&
        !!rightTeamHistory.data &&
        !!playersHistory.data &&
        !!f1ScheduleQuery.data;

    const teamViewsList = useMemo(() => {
        if (!hasRequiredData) {
            return [];
        }

        const leftTeamData = mapFantasyTeamHistoryToView(
            leftTeamHistory.data,
            playersHistory.data,
        );

        const leftTeamMap = new Map(
            leftTeamData.map((team) => [team.raceWeek, team]),
        );

        const rightTeamData = mapFantasyTeamHistoryToView(
            rightTeamHistory.data,
            playersHistory.data,
        );

        const rightTeamMap = new Map(
            rightTeamData.map((team) => [team.raceWeek, team]),
        );

        const scheduleMap = new Map(
            f1ScheduleQuery.data?.map((race) => [race.meetingNumber, race]),
        );

        return [...raceWeeks].reverse().map((raceWeekId) => {
            const leftTeam = leftTeamMap.get(raceWeekId);
            const rightTeam = rightTeamMap.get(raceWeekId);
            const raceWeekInfo = scheduleMap.get(raceWeekId);

            return {
                raceWeekId,
                teamViews: [leftTeam!.playersView, rightTeam!.playersView],
                raceWeekInfo: raceWeekInfo!,
            };
        });
    }, [
        raceWeeks,
        f1ScheduleQuery.data,
        rightTeamHistory.data,
        leftTeamHistory.data,
        playersHistory.data,
        hasRequiredData,
    ]);

    return {
        data: teamViewsList,
        isLoading: isLoading || !hasRequiredData,
    };
};
