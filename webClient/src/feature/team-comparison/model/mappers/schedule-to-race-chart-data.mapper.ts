import type { F1ScheduleMeeting } from '@/entities/schedule';
import type { TeamComparisonChartPoint } from '../team-comparison.types';

export const mapScheduleToChartPoint = (
    points: TeamComparisonChartPoint[],
    scheduleData: F1ScheduleMeeting[],
): TeamComparisonChartPoint[] => {
    const scheduleMap = new Map(
        scheduleData.map((race) => [race.meetingNumber, race]),
    );

    return points.map((point) => {
        const meeting = scheduleMap.get(point.raceWeek);

        return {
            ...point,
            meetingName: meeting?.meetingName,
            flagImageUrl: meeting?.flagImageUrl
                ? meeting?.flagImageUrl
                : undefined,
        };
    });
};
