import { useMemo } from 'react';
import { useQueries } from '@tanstack/react-query';

import type { TeamOwnerType } from '@/feature/team-owner-switch';

import type { FantasyTeamHistoryItem } from '../model/types/fantasy-team-history-item.type';
import { getFantasyTeamQueryOptions } from './fantasy-team-query-options';

type UseFantasyTeamHistoryQueryParams = {
    userId?: TeamOwnerType;
    raceWeeks?: number[];
    teamNo?: number;
};

export const useFantasyTeamHistoryQuery = ({
    userId,
    raceWeeks,
    teamNo = 1,
}: UseFantasyTeamHistoryQueryParams) => {
    const safeRaceWeeks = raceWeeks ?? [];

    const isEnabled = !!userId && safeRaceWeeks.length > 0;

    const queries = useQueries({
        queries: safeRaceWeeks.map((raceWeek) => ({
            ...getFantasyTeamQueryOptions(userId!, raceWeek, teamNo),
            enabled:
                safeRaceWeeks.length > 0 &&
                !!userId &&
                Number.isFinite(raceWeek) &&
                Number.isFinite(teamNo),
        })),
    });

    const data: FantasyTeamHistoryItem[] = useMemo(() => {
        return queries.flatMap((query, index) => {
            if (!query.data) return [];

            return [
                {
                    raceWeek: safeRaceWeeks[index],
                    team: query.data,
                },
            ];
        });
    }, [queries, raceWeeks]);

    return {
        data,
        isLoading: isEnabled && queries.some((query) => query.isLoading),
        isFetching: isEnabled && queries.some((query) => query.isFetching),
        isError: queries.some((query) => query.isError),
        queries,
    };
};
