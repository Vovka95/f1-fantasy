import { XIcon } from 'lucide-react';

import { type TeamPlayer } from '@/entities/fantasy-team';

import { BuildTeamView } from '../../build-team-view';
import { IconButton } from '@/shared/ui';

type GeneratedBuildTeamProps = {
    drivers: TeamPlayer[];
    constructors: TeamPlayer[];
    calculatedPoints: number;
    remainingBudget: number;
    teamId: string;
    onRemoveTeam: (teamId: string) => void;
};

export const GeneratedBuildTeam = ({
    drivers,
    constructors,
    calculatedPoints,
    remainingBudget,
    teamId,
    onRemoveTeam,
}: GeneratedBuildTeamProps) => {
    return (
        <div className="relative group">
            <BuildTeamView
                drivers={drivers}
                constructors={constructors}
                calculatedPoints={calculatedPoints}
                remainingBudget={remainingBudget}
                mode="editable"
            />

            <IconButton
                onClick={() => onRemoveTeam(teamId)}
                size="md"
                icon={<XIcon size={18} />}
                aria-label="Remove Team"
                className="bg-card rounded-md cursor-pointer absolute right-5 top-5 opacity-0 group-hover:opacity-100 transition-opacity"
            />
        </div>
    );
};
