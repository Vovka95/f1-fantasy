import { useGameDaysQuery } from '@/entities/game-days';
import { volodymyrId } from '@/feature/team-owner-switch';
import { Select } from '@/shared/ui';
import { useEffect, useMemo } from 'react';

type RaveWeekSelect = {
    value: number;
    onChange: (v: number) => void;
};

export const RaceWeekSelect = ({ value, onChange }: RaveWeekSelect) => {
    const gameDaysQuery = useGameDaysQuery({ userId: volodymyrId });

    const raceWeekSeries = gameDaysQuery.data?.raceWeeks.raceWeekSeries;
    const lastCompletedRaceWeekId =
        gameDaysQuery.data?.raceWeeks.lastCompletedRaceWeekId;

    const raceWeekOptions = useMemo(() => {
        return raceWeekSeries?.map((rw) => ({
            value: `${rw.raceWeekId}`,
            label: `Race week ${rw.raceWeekId}`,
        }));
    }, [raceWeekSeries]);

    useEffect(() => {
        lastCompletedRaceWeekId && onChange(lastCompletedRaceWeekId);
    }, [lastCompletedRaceWeekId]);

    const isLoading = gameDaysQuery.isLoading || !raceWeekOptions;

    return (
        <div className="w-auto">
            {!isLoading && (
                <Select
                    value={String(value)}
                    onValueChange={(nextValue) => onChange(Number(nextValue))}
                    options={raceWeekOptions}
                    placeholder="Choose race week"
                    disabled={isLoading}
                />
            )}
        </div>
    );
};
