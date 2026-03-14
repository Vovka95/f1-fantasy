import { useMemo, useState } from 'react';

import { usePlayersListQuery } from '@/feature/players-list';

export const useDriversPage = () => {
    const [raceWeek, setRaceWeek] = useState(1);

    const { data, isLoading, isError } = usePlayersListQuery({
        raceWeek,
    });

    const drivers = useMemo(() => {
        return data ? data.filter((item) => item.type === 'DRIVER') : [];
    }, [data]);

    return {
        raceWeek,
        setRaceWeek,

        drivers,
        isLoading,
        isError,
    };
};
