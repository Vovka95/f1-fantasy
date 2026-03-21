import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';

import type { PlayerPreview } from '@/entities/player';
import type { TeamOwnerType } from '@/feature/team-owner-switch';

import { PlayersTable } from '../../ui';

import {
    getUserRemainingBudget,
    getUserSelectedPlayerIds,
    useGeneratedTeamBuilderStore,
} from '../../model';

type TeamBuilderSelectProps = {
    userId: TeamOwnerType;
    playersPreview: PlayerPreview[];
};

export const TeamBuilderSelect = ({
    userId,
    playersPreview,
}: TeamBuilderSelectProps) => {
    const addPlayer = useGeneratedTeamBuilderStore((state) => state.addPlayer);

    const remainingBudget = useGeneratedTeamBuilderStore((state) =>
        getUserRemainingBudget(state, userId),
    );

    const selectedPlayerIds = useGeneratedTeamBuilderStore(
        useShallow((state) => getUserSelectedPlayerIds(state, userId)),
    );

    const selectedPositionType = useGeneratedTeamBuilderStore(
        (state) => state.selectedPositionType,
    );

    const onAddPlayer = (playerPreview: PlayerPreview) => {
        addPlayer(userId, playerPreview);
    };

    const players = useMemo(
        () =>
            playersPreview.filter(
                (item) => item.positionName === selectedPositionType,
            ),
        [playersPreview, selectedPositionType],
    );

    const selectedPlayersSet = useMemo(
        () => new Set(selectedPlayerIds),
        [selectedPlayerIds],
    );

    return (
        <div className="flex-1 min-h-0 w-full">
            <PlayersTable
                players={players}
                onAddPlayer={onAddPlayer}
                selectedPlayersSet={selectedPlayersSet}
                remainingBudget={remainingBudget}
            />
        </div>
    );
};
