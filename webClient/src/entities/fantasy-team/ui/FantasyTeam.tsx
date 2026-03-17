import { PlayerPreviewCard } from '@/entities/player';

import type { TeamPlayer } from '../model/fantasy-team-player.types';

type FantasyTeamProps = {
    drivers: TeamPlayer[];
    constructors: TeamPlayer[];
    onClick?: (playerId: string) => void;
};

export const FantasyTeam = ({
    drivers,
    constructors,
    onClick,
}: FantasyTeamProps) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-5 gap-3">
                {drivers.map((driver) => (
                    <PlayerPreviewCard
                        onClick={() => onClick && onClick(driver.preview.id)}
                        key={driver.preview.id}
                        player={driver.preview}
                        info={driver.raceInfo}
                        className="max-w-none"
                    />
                ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
                {constructors.map((constructor) => (
                    <PlayerPreviewCard
                        onClick={() =>
                            onClick && onClick(constructor.preview.id)
                        }
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
