import { PlayerPreviewCard, type PlayerPreview } from '@/entities/player';

import type { FantasyTeamLineupModel } from '../model';

type FantasyTeamLineupProps = {
    players: FantasyTeamLineupModel;
    onClick?: (player: PlayerPreview) => void;
};

export const FantasyTeamLineup = ({
    players,
    onClick,
}: FantasyTeamLineupProps) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-5 gap-3">
                {players.drivers.map((driver) => (
                    <PlayerPreviewCard
                        onClick={onClick}
                        key={driver.preview.id}
                        player={driver.preview}
                        info={driver.raceInfo}
                        className="max-w-none"
                    />
                ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
                {players.constructors.map((constructor) => (
                    <PlayerPreviewCard
                        onClick={onClick}
                        key={constructor.preview.id}
                        player={constructor.preview}
                        info={constructor.raceInfo}
                        className="max-w-none"
                    />
                ))}
            </div>
        </div>
    );
};
