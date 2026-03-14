import { DriversListTable } from '@/widgets/drivers-list-table';

import { useDriversPage } from '../model/useDriversPage';
import { RaceWeekSelect } from '@/feature/select-race-week';

export const DriversPage = () => {
    const { drivers, isError, isLoading, raceWeek, setRaceWeek } =
        useDriversPage();

    return (
        <div className="flex flex-col h-full gap-4 overflow-hidden">
            <header className="flex gap-2 justify-end">
                <div className="w-auto">
                    <RaceWeekSelect value={raceWeek} onChange={setRaceWeek} />
                </div>
            </header>

            <section className="flex-1 min-h-0">
                {!isLoading && !isError && <DriversListTable data={drivers} />}
            </section>
        </div>
    );
};
