import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    formatMeetingDateRange,
    type F1ScheduleMeeting,
} from '@/entities/schedule';

import { Button } from '@/shared/ui';
import { ChevronRightIcon } from 'lucide-react';

type ActiveRaceWeekWidgetProps = {
    activeRaceWeekMeeting: F1ScheduleMeeting;
};

export const ActiveRaceWeekWidget = ({
    activeRaceWeekMeeting,
}: ActiveRaceWeekWidgetProps) => {
    const navigate = useNavigate();

    const onManageTeamClick = () => {
        navigate('/manage-team');
    };

    const meetingDateRange = useMemo(
        () => formatMeetingDateRange(activeRaceWeekMeeting),
        [activeRaceWeekMeeting],
    );

    return (
        <div className="w-full overflow-hidden rounded-md bg-card border border-border">
            <div className="flex min-h-50 items-stretch gap-6 p-4 md:p-5">
                <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-6">
                        <div className="min-w-0 flex-1">
                            <div className="mb-3 flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-red-600" />
                                <span className="text-xs font-semibold uppercase tracking-wide text-fg/80">
                                    Round {activeRaceWeekMeeting.meetingNumber}
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                {activeRaceWeekMeeting.flagImageUrl ? (
                                    <img
                                        src={activeRaceWeekMeeting.flagImageUrl}
                                        alt={
                                            activeRaceWeekMeeting.countryName ??
                                            activeRaceWeekMeeting.meetingLocation
                                        }
                                        className="h-5 w-5 rounded-full object-cover"
                                    />
                                ) : null}

                                <h2 className="truncate text-xl font-black uppercase leading-none text-fg">
                                    {activeRaceWeekMeeting.meetingLocation}
                                </h2>
                            </div>

                            <p className="mt-2 line-clamp-2 text-sm font-medium uppercase tracking-wide text-fg/85">
                                {activeRaceWeekMeeting.meetingOfficialName}
                            </p>
                        </div>

                        <div className="hidden lg:flex shrink-0 items-center justify-center px-4">
                            {activeRaceWeekMeeting.trackImageUrl ? (
                                <img
                                    src={activeRaceWeekMeeting.trackImageUrl}
                                    alt={`${activeRaceWeekMeeting.circuitOfficialName} track`}
                                    className="max-h-18 w-auto object-contain"
                                />
                            ) : null}
                        </div>
                    </div>

                    <div className="mt-6 flex items-end justify-between gap-6 border-t border-border pt-4">
                        <div className="text-xl font-semibold text-fg">
                            {meetingDateRange}
                        </div>

                        <Button
                            variant="danger"
                            size="md"
                            onClick={onManageTeamClick}
                            rightIcon={<ChevronRightIcon size={14} />}
                            className="px-10 cursor-pointer"
                        >
                            Manage teams
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
