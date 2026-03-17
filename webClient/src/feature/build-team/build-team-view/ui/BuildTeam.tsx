import { BuildTeamPlayerPreviewCard } from './BuildTeamPlayerPreviewCard';

import type {
    BuildTeamModel,
    BuildTeamPlayerPreviewCardModel,
} from '../model/build-team-view.types';

type BuildTeamProps = BuildTeamModel & BuildTeamPlayerPreviewCardModel;

export const BuildTeam = ({
    drivers,
    constructors,
    onCaptainChange,
    onRemovePlayer,
    mode,
}: BuildTeamProps) => {
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
            </div>
        </div>
    );
};
