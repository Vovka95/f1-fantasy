import { volodymyrId } from '@/feature/team-owner-switch';
import { useGameDaysQuery } from '../api/useGameDays';

export const useLastCompletedRaceWeek = () => {
    const { data, isLoading } = useGameDaysQuery({ userId: volodymyrId });

    const lastCompletedRaceWeekId = data?.raceWeeks.lastCompletedRaceWeekId;

    return {
        lastCompletedRaceWeekId,
        isLoading: isLoading || !lastCompletedRaceWeekId,
    };
};
