import { BuildTeamPlayerPreviewCard } from './BuildTeamPlayerPreviewCard';

import {
    MAX_CONSTRUCTORS,
    MAX_DRIVERS,
    type BuildTeamModel,
    type BuildTeamPlayerPreviewCardModel,
} from '../model/build-team-view.types';
import { useMemo } from 'react';
import { BuildTeamPlayerEmptyCard } from './BuildTeamPlayerEmptyCard';

type BuildTeamProps = BuildTeamModel & BuildTeamPlayerPreviewCardModel;

export const BuildTeam = ({
    drivers,
    constructors,
    onCaptainChange,
    onRemovePlayer,
    onEmptySlotClick,
    mode,
}: BuildTeamProps) => {
    const driversEmptySlots = useMemo(
        () => Math.max(0, MAX_DRIVERS - drivers.length),
        [drivers],
    );
    const constructorsEmptySlots = useMemo(
        () => Math.max(0, MAX_CONSTRUCTORS - constructors.length),
        [constructors],
    );

    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-5 gap-3">
                {drivers.map((driver) => (
                    <BuildTeamPlayerPreviewCard
                        key={driver.preview.id}
                        onCaptainChange={onCaptainChange}
                        onRemovePlayer={onRemovePlayer}
                        player={driver}
                        mode={mode}
                    />
                ))}

                {Array.from({ length: driversEmptySlots }).map((_, i) => (
                    <BuildTeamPlayerEmptyCard
                        key={`empty-${i}`}
                        onClick={onEmptySlotClick}
                        title="Add Driver"
                        playerPositionType="DRIVER"
                        className="max-w-none"
                    />
                ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
                {constructors.map((constructor) => (
                    <BuildTeamPlayerPreviewCard
                        key={constructor.preview.id}
                        onCaptainChange={onCaptainChange}
                        onRemovePlayer={onRemovePlayer}
                        player={constructor}
                        mode={mode}
                    />
                ))}

                {Array.from({ length: constructorsEmptySlots }).map((_, i) => (
                    <BuildTeamPlayerEmptyCard
                        key={`empty-${i}`}
                        onClick={onEmptySlotClick}
                        title="Add Constructor"
                        playerPositionType="CONSTRUCTOR"
                        className="max-w-none"
                    />
                ))}
            </div>
        </div>
    );
};
