import { useMemo } from 'react';

import { usePlayersListQuery } from '@/feature/players-list';
import { ConstructorsListTable } from '@/widgets/constructors-list-table';

export const ConstructorsPage = () => {
    const { data } = usePlayersListQuery({ raceWeek: 1 });

    const constructorsData = useMemo(() => {
        return data ? data.filter((item) => item.type === 'CONSTRUCTOR') : [];
    }, [data]);

    return (
        <div className="flex h-full gap-4 overflow-hidden">
            <div className="flex-1 min-h-0">
                {data && (
                    <ConstructorsListTable
                        data={constructorsData}
                        hiddenColumns={['teamName']}
                    />
                )}
            </div>
        </div>
    );
};
