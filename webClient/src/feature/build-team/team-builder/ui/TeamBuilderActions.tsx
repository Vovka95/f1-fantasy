import type { TeamOwnerType } from '@/feature/team-owner-switch';
import { PlayersEntityTypeSwitch } from '@/feature/players-entity-type-switch';
import type { PlayerPositionNameType } from '@/entities/player';

import { Button } from '@/shared/ui';

import {
    getUserRemainingBudget,
    useGeneratedTeamBuilderStore,
} from '../../model';

type TeamBuilderActionProps = {
    userId: TeamOwnerType;
};

export const TeamBuilderAction = ({ userId }: TeamBuilderActionProps) => {
    const saveTeamFromForm = useGeneratedTeamBuilderStore(
        (state) => state.saveTeamFromForm,
    );

    const resetForm = useGeneratedTeamBuilderStore((state) => state.resetForm);

    const remainingBudget = useGeneratedTeamBuilderStore((state) =>
        getUserRemainingBudget(state, userId),
    );

    const selectedPositionType = useGeneratedTeamBuilderStore(
        (state) => state.selectedPositionType,
    );

    const setSelectedPositionType = useGeneratedTeamBuilderStore(
        (state) => state.setSelectedPositionType,
    );

    const onSetSelectedPositionType = (value: PlayerPositionNameType) => {
        setSelectedPositionType(value);
    };

    return (
        <div className="flex min-w-0 w-full min-h-0 overflow-hidden items-center">
            <PlayersEntityTypeSwitch
                value={selectedPositionType}
                onValueChange={onSetSelectedPositionType}
            />

            <div className="flex-1 text-center">
                <p className="font-semibold ">${remainingBudget.toFixed(1)}</p>
            </div>

            <div className="flex shrink-0 items-center gap-1">
                <Button variant="secondary" onClick={() => resetForm(userId)}>
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    onClick={() => saveTeamFromForm(userId)}
                >
                    Save Team
                </Button>
            </div>
        </div>
    );
};
