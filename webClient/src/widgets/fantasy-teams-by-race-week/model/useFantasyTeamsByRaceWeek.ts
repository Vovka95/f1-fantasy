import { useMemo } from 'react';

import {
    mapFantasyTeamHistoryToView,
    useFantasyTeamHistoryQuery,
} from '@/entities/fantasy-team';
import { usePlayersHistoryQuery } from '@/entities/player';
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

    const isLoading =
        leftTeamHistory.isLoading ||
        rightTeamHistory.isLoading ||
        playersHistory.isLoading ||
        !rightTeamHistory.data ||
        !leftTeamHistory.data ||
        !playersHistory.data;

    const leftTeamData = useMemo(() => {
        if (!leftTeamHistory.data || !playersHistory.data || isLoading) {
            return [];
        }

        return mapFantasyTeamHistoryToView(
            leftTeamHistory.data,
            playersHistory.data,
        );
    }, [leftTeamHistory.data, playersHistory.data, isLoading]);

    const rightTeamData = useMemo(() => {
        if (!rightTeamHistory.data || !playersHistory.data || isLoading) {
            return [];
        }

        return mapFantasyTeamHistoryToView(
            rightTeamHistory.data,
            playersHistory.data,
        );
    }, [rightTeamHistory.data, playersHistory.data, isLoading]);

    const teamViewsList = useMemo(() => {
        return [...raceWeeks].reverse().map((raceWeekId) => {
            const leftTeam = leftTeamData.find(
                (team) => team.raceWeek === raceWeekId,
            );
            const rightTeam = rightTeamData.find(
                (team) => team.raceWeek === raceWeekId,
            );

            return {
                raceWeekId,
                teamViews: [leftTeam?.playersView!, rightTeam?.playersView!],
            };
        });
    }, [leftTeamData, rightTeamData]);

    return {
        data: teamViewsList,
        isLoading,
    };
};
