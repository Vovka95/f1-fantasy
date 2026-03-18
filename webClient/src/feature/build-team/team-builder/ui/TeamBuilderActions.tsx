import { Button } from '@/shared/ui';
import { useGeneratedTeamBuilderStore } from '../model/team-builder.store';

type TeamBuilderActionProps = {
    userId: string;
};

export const TeamBuilderAction = ({ userId }: TeamBuilderActionProps) => {
    const createTeamFromForm = useGeneratedTeamBuilderStore(
        (s) => s.createTeamFromForm,
    );

    const resetForm = useGeneratedTeamBuilderStore((s) => s.resetForm);

    return (
        <div className="flex gap-3">
            <Button variant="secondary" onClick={() => resetForm(userId)}>
                Reaset
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
