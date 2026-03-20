import { useMemo } from 'react';
import { useQueries } from '@tanstack/react-query';

import type { TeamOwnerType } from '@/feature/team-owner-switch';
import { getFantasyTeamQueryOptions } from './fantasy-team-query-options';

type UseFantasyTeamHistoryQueryParams = {
    userId?: TeamOwnerType;
    raceWeeks?: number[];
};

export const useFantasyTeamHistoryQuery = ({
    userId,
    raceWeeks,
}: UseFantasyTeamHistoryQueryParams) => {
    const safeRaceWeeks = raceWeeks ?? [];

    const isEnabled = !!userId && safeRaceWeeks.length > 0;

    const queries = useQueries({
        queries: safeRaceWeeks.map((raceWeek) => ({
            ...getFantasyTeamQueryOptions(userId!, raceWeek),
            enabled:
                safeRaceWeeks.length > 0 &&
                isEnabled &&
                Number.isFinite(raceWeek),
        })),
    });

    const data = useMemo(() => {
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
        isLoading: queries.some((query) => query.isLoading),
        isFetching: queries.some((query) => query.isFetching),
        isError: queries.some((query) => query.isError),
        queries,
    };
};
