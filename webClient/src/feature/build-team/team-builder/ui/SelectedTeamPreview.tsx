import type { TeamOwnerType } from '@/feature/team-owner-switch';

import type { TeamPlayer } from '@/entities/fantasy-team';
import type { PlayerPositionNameType } from '@/entities/player';

import { BuildTeamPlayersGrid } from '../../ui';

import {
    getUserGeneratedTeamForm,
    useGeneratedTeamBuilderStore,
} from '../../model';
import { useShallow } from 'zustand/react/shallow';

type SelectedTeamPreviewProps = {
    userId: TeamOwnerType;
};

export const SelectedTeamPreview = ({ userId }: SelectedTeamPreviewProps) => {
    const {
        drivers,
        constructors,
        removePlayer,
        setCaptain,
        setSelectedPositionType,
    } = useGeneratedTeamBuilderStore(
        useShallow((state) => {
            const form = getUserGeneratedTeamForm(state, userId);

            return {
                drivers: form.drivers,
                constructors: form.constructors,
                removePlayer: state.removePlayer,
                setCaptain: state.setCaptain,
                setSelectedPositionType: state.setSelectedPositionType,
            };
        }),
    );

    const onRemovePlayer = (player: TeamPlayer) => {
        removePlayer(userId, player);
    };

    const onCaptainChange = (player: TeamPlayer) => {
        setCaptain(userId, player);
    };

    const onEmptySlotClick = (positionType: PlayerPositionNameType) => {
        setSelectedPositionType(positionType);
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
                    onEmptySlotClick: onEmptySlotClick,
                    mode: 'editable',
                }}
            />
        </div>
    );
};
