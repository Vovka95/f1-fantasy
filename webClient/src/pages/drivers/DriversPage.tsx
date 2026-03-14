import { useMemo } from 'react';

import { usePlayersListQuery } from '@/feature/players-list';
import { DriversListTable } from '@/widgets/drivers-list-table';

export const DriversPage = () => {
    const { data } = usePlayersListQuery({ raceWeek: 1 });

    const driversData = useMemo(() => {
        return data ? data.filter((item) => item.type === 'DRIVER') : [];
    }, [data]);

    return (
        <div className="flex h-full gap-4 overflow-hidden">
            <div className="flex-1 min-h-0">
                {data && <DriversListTable data={driversData} />}
            </div>
        </div>
    );
};
