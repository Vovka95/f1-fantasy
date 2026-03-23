import { useEffect } from 'react';
import type { TeamOwnerType } from '@/feature/team-owner-switch';

import { AccordionItem, FullPageLoader } from '@/shared/ui';
import { useAccordion } from '@/shared/lib/hooks/useAccordion';

import { FantasyTeamsWidget } from '@/widgets/fantasy-teams';
import { RaceWeekHeaderContent } from '@/widgets/race-week-header-content';

import { useFantasyTeamsByRaceWeek } from '../model/useFantasyTeamsByRaceWeek';

type FantasyTeamsByRaceWeekProps = {
    leftUserId: TeamOwnerType;
    rightUserId: TeamOwnerType;
    raceWeeks: number[];
};

export const FantasyTeamsByRaceWeek = ({
    leftUserId,
    rightUserId,
    raceWeeks,
}: FantasyTeamsByRaceWeekProps) => {
    const { data, isLoading } = useFantasyTeamsByRaceWeek({
        leftUserId,
        rightUserId,
        raceWeeks,
    });

    const defaultOpenRaceWeekId = data[0]?.raceWeekId;

    const { isOpen, open, toggle } = useAccordion<number>({
        defaultOpenItems: defaultOpenRaceWeekId ? [defaultOpenRaceWeekId] : [],
        type: 'multiple',
    });

    useEffect(() => {
        defaultOpenRaceWeekId && open(defaultOpenRaceWeekId);
    }, [defaultOpenRaceWeekId]);

    if (isLoading || !data) {
        return <FullPageLoader />;
    }

    return (
        <div className="w-full flex flex-col gap-4 overflow-auto">
            <div className="flex flex-col gap-1">
                {data.map(({ raceWeekId, teamViews, raceWeekInfo }) => {
                    return (
                        <AccordionItem
                            key={raceWeekId}
                            isOpen={isOpen(raceWeekId)}
                            onToggle={() => toggle(raceWeekId)}
                            header={
                                <RaceWeekHeaderContent
                                    meeting={raceWeekInfo!}
                                />
                            }
                        >
                            <FantasyTeamsWidget
                                teamViews={teamViews}
                                type="grandprix"
                            />
                        </AccordionItem>
                    );
                })}
            </div>
        </div>
    );
};
