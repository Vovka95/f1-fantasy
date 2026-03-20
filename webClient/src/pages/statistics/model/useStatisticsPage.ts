import { useMemo, useState } from 'react';

import type { PlayersEntityType } from '@/feature/players-entity-type-switch';
import { usePlayersQuery } from '@/entities/player';

export const useStatisticsPage = () => {
    const [raceWeek, setRaceWeek] = useState<number | undefined>();
    const [filterBy, setFilterBy] = useState<PlayersEntityType>('DRIVER');

    const { data, isLoading, isError } = usePlayersQuery({
        raceWeek,
    });

    const players = useMemo(() => {
        return data
            ? data.table.filter((item) => item.positionName === filterBy)
            : [];
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
