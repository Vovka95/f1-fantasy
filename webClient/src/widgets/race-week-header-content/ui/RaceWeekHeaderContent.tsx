import {
    formatMeetingDateRange,
    type F1ScheduleMeeting,
} from '@/entities/schedule';

type RaceWeekHeaderContentProps = {
    meeting: F1ScheduleMeeting;
};

export const RaceWeekHeaderContent = ({
    meeting,
}: RaceWeekHeaderContentProps) => {
    const date = formatMeetingDateRange(meeting);

    return (
        <div className="flex items-center gap-5 w-full px-10">
            <div className="flex items-center gap-5 min-w-0">
                <div className="flex items-center gap-5 min-w-0">
                    {meeting.flagImageUrl && (
                        <img
                            src={meeting.flagImageUrl}
                            alt={meeting.meetingLocation}
                            className="h-4 w-4 rounded-full object-cover shrink-0"
                        />
                    )}

                    <div className="flex flex-col min-w-0">
                        <span className="text-xs uppercase text-muted-foreground">
                            Round {meeting.meetingNumber}
                        </span>

                        <span className="text-sm font-semibold truncate">
                            {meeting.meetingLocation}
                        </span>

                        <span className="text-xs text-muted-foreground">
                            {date}
                        </span>
                    </div>
                </div>
            </div>

            {meeting.trackImageUrl && (
                <img
                    src={meeting.trackImageUrl}
                    alt={meeting.circuitShortName!}
                    className="h-6 w-auto object-contain opacity-80 shrink-0"
                />
            )}
        </div>
    );
};
