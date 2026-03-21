import { useMemo } from 'react';
import { useQueries } from '@tanstack/react-query';

import { getPlayersQueryOptions } from './players-query-options';

import type { PlayersHistoryItem } from '../model';

type UsePlayersHistoryQueryParams = {
    raceWeeks?: number[];
};

export const usePlayersHistoryQuery = ({
    raceWeeks,
}: UsePlayersHistoryQueryParams) => {
    const safeRaceWeeks = raceWeeks ?? [];

    const isEnabled = safeRaceWeeks.length > 0;

    const queries = useQueries({
        queries: safeRaceWeeks.map((raceWeek) => ({
            ...getPlayersQueryOptions(raceWeek),
            enabled: isEnabled && Number.isFinite(raceWeek),
        })),
    });

    const data: PlayersHistoryItem[] = useMemo(() => {
        return queries.flatMap((query, index) => {
            if (!query.data) return [];

            return [
                {
                    raceWeek: safeRaceWeeks[index],
                    players: query.data,
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
