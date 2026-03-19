import type { TeamOwnerType } from '@/feature/team-owner-switch';

import { Button } from '@/shared/ui';
import { useGeneratedTeamBuilderStore } from '../../model';

type TeamBuilderActionProps = {
    userId: TeamOwnerType;
};

export const TeamBuilderAction = ({ userId }: TeamBuilderActionProps) => {
    const createTeamFromForm = useGeneratedTeamBuilderStore(
        (state) => state.createTeamFromForm,
    );

    const resetForm = useGeneratedTeamBuilderStore((state) => state.resetForm);

    return (
        <div className="flex gap-3">
            <Button variant="secondary" onClick={() => resetForm(userId)}>
                Reset
            </Button>
            <Button
                variant="primary"
                onClick={() => createTeamFromForm(userId)}
            >
                Create Team
            </Button>
        </div>
    );
};
