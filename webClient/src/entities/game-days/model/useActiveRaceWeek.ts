import { volodymyrId } from '@/feature/team-owner-switch';
import { useGameDaysQuery } from '../api/useGameDays';

export const useActiveRaceWeek = () => {
    const { data, isLoading } = useGameDaysQuery({ userId: volodymyrId });

    const activeRaceWeekId = data?.raceWeeks.activeRaceWeekId;

    return {
        activeRaceWeekId,
        isLoading: isLoading || !activeRaceWeekId,
    };
};
