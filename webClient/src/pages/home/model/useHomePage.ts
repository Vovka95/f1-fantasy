import { useMemo } from 'react';

import {
    mapFantasyTeamToView,
    useFantasyTeamQuery,
} from '@/entities/fantasy-team';
import { usePlayersQuery } from '@/entities/player';
import { useActiveRaceWeek } from '@/entities/game-days';
import { khrystynaId, volodymyrId } from '@/feature/team-owner-switch';

export const useHomePage = () => {
    const { activeRaceWeekId, isLoading: isRaceWeekLoading } =
        useActiveRaceWeek();

    const playersQuery = usePlayersQuery({
        raceWeek: activeRaceWeekId,
    });

    const firstTeamQuery = useFantasyTeamQuery({
        userId: volodymyrId,
        raceWeek: activeRaceWeekId,
    });

    const secondTeamQuery = useFantasyTeamQuery({
        userId: khrystynaId,
        raceWeek: activeRaceWeekId,
    });

    const isLoading =
        isRaceWeekLoading ||
        !activeRaceWeekId ||
        playersQuery.isLoading ||
        firstTeamQuery.isLoading ||
        secondTeamQuery.isLoading;

    const hasData =
        activeRaceWeekId &&
        playersQuery.data &&
        firstTeamQuery.data &&
        secondTeamQuery.data;

    const teamViews = useMemo(() => {
        if (!hasData) {
            return [];
        }

        return [
            mapFantasyTeamToView(
                firstTeamQuery.data!,
                playersQuery.data!.preview,
            ),
            mapFantasyTeamToView(
                secondTeamQuery.data!,
                playersQuery.data!.preview,
            ),
        ];
    }, [hasData, firstTeamQuery.data, secondTeamQuery.data, playersQuery.data]);

    return {
        isLoading,
        teamViews,
        activeRaceWeekId,
    };
};
