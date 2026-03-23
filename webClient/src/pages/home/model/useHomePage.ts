import { useMemo } from 'react';

import {
    useF1ScheduleQuery,
    type F1ScheduleMeeting,
} from '@/entities/schedule';
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

    const f1ScheduleQuery = useF1ScheduleQuery();

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
        secondTeamQuery.isLoading ||
        f1ScheduleQuery.isLoading;

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

    const f1ScheduleHasData = f1ScheduleQuery.data && activeRaceWeekId;

    const activeRaceWeekMeetingInfo = useMemo(() => {
        if (!f1ScheduleHasData) {
            return null;
        }

        return f1ScheduleQuery.data.find(
            (race) => race.meetingNumber === activeRaceWeekId,
        ) as F1ScheduleMeeting;
    }, [f1ScheduleHasData, f1ScheduleQuery.data, activeRaceWeekId]);

    return {
        isLoading: isLoading && !hasData && !f1ScheduleHasData,
        teamViews,
        activeRaceWeekId,
        raceWeekMeeting: activeRaceWeekMeetingInfo,
    };
};
