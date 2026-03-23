import type { F1ScheduleMeeting } from '../f1-schedule.mapper';

export const formatMeetingDateRange = (meeting: F1ScheduleMeeting) => {
    if (!meeting.sessions.length) return '';

    const sortedSessions = [...meeting.sessions].sort(
        (a, b) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
    );

    const start = new Date(sortedSessions[0].startDate);
    const end = new Date(sortedSessions[sortedSessions.length - 1].startDate);

    const sameMonth = start.getMonth() === end.getMonth();

    const startDay = start.toLocaleDateString('en-GB', {
        day: '2-digit',
    });

    const endDay = end.toLocaleDateString('en-GB', {
        day: '2-digit',
    });

    const month = end.toLocaleDateString('en-GB', {
        month: 'short',
    });

    if (sameMonth) {
        return `${startDay} - ${endDay} ${month}`;
    }

    const startMonth = start.toLocaleDateString('en-GB', {
        month: 'short',
    });

    return `${startDay} ${startMonth} - ${endDay} ${month}`;
};
