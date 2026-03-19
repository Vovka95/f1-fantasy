import { useEffect, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';

import {
    type PlayerPositionNameType,
    type PlayerPreview,
} from '@/entities/player';
import { type FantasyUserTeam } from '@/entities/fantasy-team';
import { PlayersEntityTypeSwitch } from '@/feature/players-entity-type-switch';
import type { TeamOwnerType } from '@/feature/team-owner-switch';

import { PlayerSelectList } from './PlayerSelectList';
import { TeamBuilderAction } from './TeamBuilderActions';
import { SelectedTeamPreview } from './SelectedTeamPreview';

import {
    getUserRemainingBudget,
    getUserSelectedPlayerIds,
    useGeneratedTeamBuilderStore,
} from '../../model';

type TeamBuilderFormProps = {
    userId: TeamOwnerType;
    playersPreview: PlayerPreview[];
    fantasyUserTeam: FantasyUserTeam;
};

export const TeamBuilderForm = ({
    userId,
    playersPreview,
    fantasyUserTeam,
}: TeamBuilderFormProps) => {
    const setInitialBudget = useGeneratedTeamBuilderStore(
        (state) => state.setInitialBudget,
    );

    const selectedPositionType = useGeneratedTeamBuilderStore(
        (state) => state.selectedPositionType,
    );

    const setSelectedPositionType = useGeneratedTeamBuilderStore(
        (state) => state.setSelectedPositionType,
    );

    const addPlayer = useGeneratedTeamBuilderStore((state) => state.addPlayer);

    const remainingBudget = useGeneratedTeamBuilderStore((state) =>
        getUserRemainingBudget(state, userId),
    );

    const selectedPlayerIds = useGeneratedTeamBuilderStore(
        useShallow((state) => getUserSelectedPlayerIds(state, userId)),
    );

    const onAddPlayer = (playerPreview: PlayerPreview) => {
        addPlayer(userId, playerPreview);
    };

    const onSetSelectedPositionType = (value: PlayerPositionNameType) => {
        setSelectedPositionType(value);
    };

    const initialBudget = fantasyUserTeam.team_info.maxTeambal;

    useEffect(() => {
        if (!initialBudget) return;

        setInitialBudget(userId, initialBudget);
    }, [initialBudget, userId, setInitialBudget]);

    const players = useMemo(() => {
        return playersPreview.filter(
            (item) => item.positionName === selectedPositionType,
        );
    }, [playersPreview, selectedPositionType]);

    return (
        <div className="flex min-h-0 bg-card p-3 gap-2 rounded-md flex-col items-center">
            <SelectedTeamPreview userId={userId} />

            <div className="flex justify-between w-full">
                <PlayersEntityTypeSwitch
                    value={selectedPositionType}
                    onValueChange={onSetSelectedPositionType}
                />

                <div className="text-center h-full flex items-center">
                    <p className="font-semibold">
                        ${remainingBudget.toFixed(1)}
                    </p>
                </div>

                <TeamBuilderAction userId={userId} />
            </div>
            <div className="flex-1 min-h-0 w-full">
                <PlayerSelectList
                    players={players}
                    onAddPlayer={onAddPlayer}
                    selectedPlayerIds={selectedPlayerIds}
                    remainingBudget={remainingBudget}
                />
            </div>
        </div>
    );
};
