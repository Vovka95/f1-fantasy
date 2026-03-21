import type { TeamOwnerType } from '@/feature/team-owner-switch';

import { AccordionItem, FullPageLoader } from '@/shared/ui';

import { FantasyTeamsWidget } from '@/widgets/fantasy-teams/ui/FantasyTeamsWidget';
import { useFantasyTeamsByRaceWeek } from '../model/useFantasyTeamsByRaceWeek';
import { useAccordion } from '@/shared/lib/hooks/useAccordion';

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

    const { isOpen, toggle } = useAccordion({
        defaultOpenItems: [data[0].raceWeekId],
        type: 'multiple',
    });

    if (isLoading || !data) {
        return <FullPageLoader />;
    }

    return (
        <div className="w-full flex flex-col gap-4 overflow-auto">
            <div className="flex flex-col gap-1">
                {data.map(({ raceWeekId, teamViews }) => {
                    return (
                        <AccordionItem
                            key={raceWeekId}
                            isOpen={isOpen(raceWeekId)}
                            onToggle={() => toggle(raceWeekId)}
                            header={
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold">
                                            Race week {raceWeekId}
                                        </span>
                                    </div>
                                </div>
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
