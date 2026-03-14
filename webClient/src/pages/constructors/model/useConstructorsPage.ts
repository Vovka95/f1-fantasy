import { usePlayersListQuery } from '@/feature/players-list';
import { useMemo, useState } from 'react';

export const useConstructorsPage = () => {
    const [raceWeek, setRaceWeek] = useState(1);

    const { data, isLoading, isError } = usePlayersListQuery({
        raceWeek,
    });

    const constructors = useMemo(() => {
        return data ? data.filter((item) => item.type === 'CONSTRUCTOR') : [];
    }, [data]);

    return {
        raceWeek,
        setRaceWeek,

        constructors,
        isLoading,
        isError,
    };
};
