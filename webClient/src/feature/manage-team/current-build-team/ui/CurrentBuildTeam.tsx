import type { TeamOwnerType } from '@/feature/team-owner-switch';

import { BuildTeamView } from '../../ui';
import { AccordionItem } from '@/shared/ui';
import { useAccordion } from '@/shared/lib/hooks/useAccordion';

import { getUserFantasyTeam, useGeneratedTeamBuilderStore } from '../../model';

const SingleAccordionItemId = 1;

type CurrentBuildTeamProps = {
    userId: TeamOwnerType;
};

export const CurrentBuildTeam = ({ userId }: CurrentBuildTeamProps) => {
    const fantasyUserTeam = useGeneratedTeamBuilderStore((state) =>
        getUserFantasyTeam(state, userId),
    );

    const { isOpen, toggle } = useAccordion<number>({
        defaultOpenItems: [SingleAccordionItemId],
        type: 'single',
    });

    if (!fantasyUserTeam) {
        return null;
    }

    return (
        <AccordionItem
            isOpen={isOpen(SingleAccordionItemId)}
            onToggle={() => toggle(SingleAccordionItemId)}
            header={
                <div className="text-sm font-medium text-fg">Current team</div>
            }
        >
            <BuildTeamView team={fantasyUserTeam} />
        </AccordionItem>
    );
};
