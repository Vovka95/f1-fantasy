import { useEffect, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { usePlayersQuery, type PlayerPreview } from '@/entities/player';
import { useFantasyTeamQuery } from '@/entities/fantasy-team';
import { PlayersEntityTypeSwitch } from '@/feature/players-entity-type-switch';
import type { TeamOwnerType } from '@/feature/team-owner-switch';

import { PlayerSelectList } from './PlayerSelectList';
import { TeamBuilderAction } from './TeamBuilderActions';
import { SelectedTeamPreview } from './SelectedTeamPreview';

import { useGeneratedTeamBuilderStore } from '../model/team-builder.store';
import { getUserSelectedPlayerIds } from '../model/team-builder.selectors';
import { getUserRemainingBudget } from '../model/team-builder-budget.selector';

type TeamBuilderFormProps = {
    userId: TeamOwnerType;
    raceWeek: number;
};

export const TeamBuilderForm = ({ userId, raceWeek }: TeamBuilderFormProps) => {
    const { data } = usePlayersQuery({ raceWeek });

    const fantasyTeamQuery = useFantasyTeamQuery({
        raceWeek,
        userId,
    });

    const selectedPositionType = useGeneratedTeamBuilderStore(
        (state) => state.selectedPositionType,
    );

    const setInitialBudget = useGeneratedTeamBuilderStore(
        (state) => state.setInitialBudget,
    );

    const selectedPlayerIds = useGeneratedTeamBuilderStore(
        useShallow((state) => getUserSelectedPlayerIds(state, userId)),
    );

    const setSelectedPositionType = useGeneratedTeamBuilderStore(
        (state) => state.setSelectedPositionType,
    );

    const addDriver = useGeneratedTeamBuilderStore((state) => state.addDriver);

    const addConstructor = useGeneratedTeamBuilderStore(
        (state) => state.addConstructor,
    );

    const remainingBudget = useGeneratedTeamBuilderStore((state) =>
        getUserRemainingBudget(state, userId),
    );

    const onAddPlayer = (playerPreview: PlayerPreview) => {
        if (playerPreview.positionName == 'DRIVER') {
            addDriver(userId, playerPreview);
        }

        if (playerPreview.positionName == 'CONSTRUCTOR') {
            addConstructor(userId, playerPreview);
        }
    };

    useEffect(() => {
        if (!fantasyTeamQuery.data) return;

        setInitialBudget(userId, fantasyTeamQuery.data.team_info.maxTeambal);
    }, [fantasyTeamQuery.data, userId, setInitialBudget]);

    const players = useMemo(() => {
        return data
            ? data.preview.filter(
                  (item) => item.positionName === selectedPositionType,
              )
            : [];
    }, [data, selectedPositionType]);

    return (
        <div className="flex min-h-0 bg-card p-3 gap-2 rounded-md flex-col items-center">
            <SelectedTeamPreview userId={userId} />

            <div className="flex justify-between w-full">
                <PlayersEntityTypeSwitch
                    value={selectedPositionType}
                    onValueChange={setSelectedPositionType}
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
