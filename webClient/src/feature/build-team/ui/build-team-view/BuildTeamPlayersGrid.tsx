import { useMemo } from 'react';

import { BuildTeamPlayerPreviewCard } from './BuildTeamPlayerPreviewCard';
import { BuildTeamPlayerEmptyCard } from './BuildTeamPlayerEmptyCard';

import {
    MAX_CONSTRUCTORS,
    MAX_DRIVERS,
    type BuildTeamEmptySlotActionModel,
    type BuildTeamPlayerActionModel,
    type BuildTeamPlayersModel,
} from '../../model';

type BuildTeamPlayersGridProps = {
    players: BuildTeamPlayersModel;
    playerActions: BuildTeamPlayerActionModel;
    emptySlotActions: BuildTeamEmptySlotActionModel;
};

export const BuildTeamPlayersGrid = ({
    players,
    playerActions,
    emptySlotActions,
}: BuildTeamPlayersGridProps) => {
    const driversEmptySlots = useMemo(
        () => Math.max(0, MAX_DRIVERS - players.drivers.length),
        [players.drivers],
    );
    const constructorsEmptySlots = useMemo(
        () => Math.max(0, MAX_CONSTRUCTORS - players.constructors.length),
        [players.constructors],
    );

    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-5 gap-3 items-stretch">
                {players.drivers.map((driver) => (
                    <BuildTeamPlayerPreviewCard
                        key={driver.preview.id}
                        onCaptainChange={playerActions.onCaptainChange}
                        onRemovePlayer={playerActions.onRemovePlayer}
                        player={driver}
                        mode={playerActions.mode}
                        className="max-w-none max-h-32"
                    />
                ))}

                {Array.from({ length: driversEmptySlots }).map((_, i) => (
                    <BuildTeamPlayerEmptyCard
                        key={`empty-${i}`}
                        onEmptySlotClick={emptySlotActions.onEmptySlotClick}
                        title="Add Driver"
                        playerPositionType="DRIVER"
                        mode={emptySlotActions.mode}
                        className="max-w-none max-h-32"
                    />
                ))}
            </div>

            <div className="grid grid-cols-2 gap-3 items-stretch">
                {players.constructors.map((constructor) => (
                    <BuildTeamPlayerPreviewCard
                        key={constructor.preview.id}
                        onCaptainChange={playerActions.onCaptainChange}
                        onRemovePlayer={playerActions.onRemovePlayer}
                        player={constructor}
                        mode={playerActions.mode}
                        className="max-w-none max-h-36"
                    />
                ))}

                {Array.from({ length: constructorsEmptySlots }).map((_, i) => (
                    <BuildTeamPlayerEmptyCard
                        key={`empty-${i}`}
                        onEmptySlotClick={emptySlotActions.onEmptySlotClick}
                        title="Add Constructor"
                        playerPositionType="CONSTRUCTOR"
                        mode={emptySlotActions.mode}
                        className="max-w-none max-h-36"
                    />
                ))}
            </div>
        </div>
    );
};
