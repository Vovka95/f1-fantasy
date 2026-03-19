import type { TeamOwnerType } from '@/feature/team-owner-switch';

import type { TeamPlayer } from '@/entities/fantasy-team';

import { BuildTeamPlayersGrid } from '../../ui';

import { useGeneratedTeamBuilderStore } from '../model/team-builder.store';
import { getUserGeneratedTeamForm } from '../model/team-builder.selectors';

type SelectedTeamPreviewProps = {
    userId: TeamOwnerType;
};

export const SelectedTeamPreview = ({ userId }: SelectedTeamPreviewProps) => {
    const { drivers, constructors } = useGeneratedTeamBuilderStore((state) =>
        getUserGeneratedTeamForm(state, userId),
    );

    const removeDriver = useGeneratedTeamBuilderStore(
        (state) => state.removeDriver,
    );

    const removeConstructor = useGeneratedTeamBuilderStore(
        (state) => state.removeConstructor,
    );

    const setCaptain = useGeneratedTeamBuilderStore(
        (state) => state.setCaptain,
    );

    const setSelectedPositionType = useGeneratedTeamBuilderStore(
        (state) => state.setSelectedPositionType,
    );

    const onRemovePlayer = (player: TeamPlayer) => {
        if (player.preview.positionName == 'DRIVER') {
            removeDriver(userId, player.preview);
        }

        if (player.preview.positionName == 'CONSTRUCTOR') {
            removeConstructor(userId, player.preview);
        }
    };

    const onCaptainChange = (player: TeamPlayer) => {
        setCaptain(userId, player.preview.id);
    };

    return (
        <div className="w-full p-3 rounded-md bg-bg">
            <BuildTeamPlayersGrid
                players={{ drivers, constructors }}
                playerActions={{
                    onRemovePlayer: onRemovePlayer,
                    onCaptainChange: onCaptainChange,
                    mode: 'editable',
                }}
                emptySlotActions={{
                    onEmptySlotClick: setSelectedPositionType,
                    mode: 'editable',
                }}
            />
        </div>
    );
};
