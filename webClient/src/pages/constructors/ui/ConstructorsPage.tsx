import { ConstructorsListTable } from '@/widgets/constructors-list-table';

import { RaceWeekSelect } from '@/feature/select-race-week';
import { useConstructorsPage } from '../model/useConstructorsPage';

export const ConstructorsPage = () => {
    const { constructors, isError, isLoading, raceWeek, setRaceWeek } =
        useConstructorsPage();

    return (
        <div className="flex flex-col h-full gap-4 overflow-hidden">
            <header className="flex gap-2 justify-end">
                <div className="w-auto">
                    <RaceWeekSelect value={raceWeek} onChange={setRaceWeek} />
                </div>
            </header>

            <section className="flex-1 min-h-0">
                {!isLoading && !isError && (
                    <ConstructorsListTable data={constructors} />
                )}
            </section>
        </div>
    );
};
