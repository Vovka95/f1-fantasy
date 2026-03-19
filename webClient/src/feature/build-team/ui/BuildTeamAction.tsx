import { Edit2Icon, XIcon } from 'lucide-react';

import { Button, IconButton } from '@/shared/ui';

import type { BuildTeamActionModel } from '../model';

type BuildTeamActionProps = BuildTeamActionModel & {
    teamId: string;
};

export const BuildTeamAction = ({
    teamId,
    onEditTeam,
    onRemoveTeam,
}: BuildTeamActionProps) => {
    return (
        <div className="flex justify-end gap-3 border-b pb-2">
            <Button
                onClick={() => onEditTeam && onEditTeam(teamId)}
                variant="ghost"
                size="md"
                rightIcon={<Edit2Icon size={14} />}
                aria-label="Edit Team"
                className="rounded-md cursor-pointer"
            >
                Edit
            </Button>
            <IconButton
                onClick={() => onRemoveTeam && onRemoveTeam(teamId)}
                size="md"
                icon={<XIcon size={18} />}
                aria-label="Remove Team"
                className="bg-card rounded-md cursor-pointer"
            />
        </div>
    );
};
