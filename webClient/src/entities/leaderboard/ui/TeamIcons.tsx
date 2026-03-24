import { PlayerAvatar, type PlayerPreview } from '@/entities/player';

type TeamIconsProps = {
    ids: string[];
    playersPreview: PlayerPreview[];
};

export const TeamIcons = ({ ids, playersPreview }: TeamIconsProps) => {
    const teamPlayers = ids.map((id) => {
        return {
            player: playersPreview.find((player) => player.id === id),
            id: id,
        };
    });

    const drivers = teamPlayers.filter(
        (p) => p.player?.positionName === 'DRIVER',
    );
    const constructors = teamPlayers.filter(
        (p) => p.player?.positionName === 'CONSTRUCTOR',
    );

    return (
        <div className="flex gap-4">
            <div className="flex -space-x-2">
                {drivers.map(({ id, player }) => (
                    <div key={id} className="flex items-center justify-center">
                        {player ? (
                            <PlayerAvatar
                                avatarImageUrl={player.avatarImageUrl}
                                playerId={player.id}
                                name={player.name}
                            />
                        ) : (
                            <div className="w-7 h-7 rounded-full bg-muted border border-bg text-xs">
                                {id}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="flex -space-x-2">
                {constructors.map(({ id, player }) => (
                    <div key={id} className="flex items-center justify-center">
                        {player ? (
                            <PlayerAvatar
                                avatarImageUrl={player.avatarImageUrl}
                                playerId={player.id}
                                name={player.name}
                            />
                        ) : (
                            <div className="w-7 h-7 rounded-full bg-muted border border-bg text-xs">
                                {id}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
