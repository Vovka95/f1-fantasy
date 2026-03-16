import { useMemo, useState } from 'react';

import type { PlayersEntityType } from '@/feature/players-entity-type-switch';

import { usePlayersListQuery } from '@/feature/players-list';

export const useStatisticsPage = () => {
    const [raceWeek, setRaceWeek] = useState(2);
    const [filterBy, setFilterBy] = useState<PlayersEntityType>('DRIVER');

    const { data, isLoading, isError } = usePlayersListQuery({
        raceWeek,
    });

    const players = useMemo(() => {
        return data ? data.filter((item) => item.type === filterBy) : [];
    }, [data, filterBy]);

    return {
        raceWeek,
        setRaceWeek,

        filterBy,
        setFilterBy,

        players,
        isLoading,
        isError,
    };
};
