import { RaceWeekSelect } from '@/entities/game-days';
import { PlayersEntityTypeSwitch } from '@/feature/players-entity-type-switch';

import { ConstructorsListTable } from '@/widgets/constructors-list-table';
import { DriversListTable } from '@/widgets/drivers-list-table';

import { useStatisticsPage } from '../model/useStatisticsPage';

export const StatisticsPage = () => {
    const {
        players,
        isError,
        isLoading,
        filterBy,
        setFilterBy,
        raceWeek,
        setRaceWeek,
    } = useStatisticsPage();

    return (
        <div className="flex w-full h-full justify-center">
            <div className="flex flex-col w-full h-full max-w-400 min-h-0 overflow-hidden gap-4">
                <header className="flex gap-2 justify-between">
                    <RaceWeekSelect value={raceWeek!} onChange={setRaceWeek} />

                    <PlayersEntityTypeSwitch
                        value={filterBy}
                        onValueChange={setFilterBy}
                    />
                </header>

                <section className="flex-1 min-h-0">
                    {!isLoading && !isError && (
                        <>
                            {filterBy === 'DRIVER' ? (
                                <DriversListTable data={players} />
                            ) : (
                                <ConstructorsListTable data={players} />
                            )}
                        </>
                    )}
                </section>
            </div>
        </div>
    );
};
