import { cn } from '@/shared/lib/cn';

import { PlayerAvatar } from '@/entities/player';
import { PlayersEntityTypeSwitch } from '@/feature/players-entity-type-switch';

import { usePricePredictionPage } from '../model/usePricePredictionPage';

export const PricePredictionPage = () => {
    const {
        filterBy,
        setFilterBy,
        players,
        selectedPlayer,
        setSelectedPlayer,
        playerStats,
    } = usePricePredictionPage();

    return (
        <div className="flex gap-4 w-full h-full min-h-0 justify-center">
            <div className="flex flex-col w-full h-full max-w-400 min-h-0 overflow-hidden gap-4">
                <header className="flex gap-2 justify-end">
                    <PlayersEntityTypeSwitch
                        value={filterBy}
                        onValueChange={setFilterBy}
                    />
                </header>
                <section className="grid flex-1 min-h-0 grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-4">
                    <ul className="flex min-h-0 flex-col gap-3 overflow-y-auto">
                        {players.map((player) => (
                            <li key={player.id}>
                                <button
                                    type="button"
                                    aria-pressed={
                                        selectedPlayer?.id === player.id
                                    }
                                    onClick={() => setSelectedPlayer(player)}
                                    className={cn(
                                        'flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-primary',
                                        selectedPlayer?.id === player.id
                                            ? 'border-primary bg-primary/10'
                                            : 'border-border hover:bg-hover',
                                    )}
                                >
                                    <PlayerAvatar
                                        playerId={player.id}
                                        avatarImageUrl={player.avatarImageUrl}
                                        name={player.displayName}
                                    />
                                    <div className="min-w-0">
                                        <p className="truncate font-medium">
                                            {player.displayName}
                                        </p>
                                        <p className="truncate text-sm text-muted-fg">
                                            {player.teamName ||
                                                player.displayName}
                                        </p>
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="min-w-0 min-h-0 overflow-y-auto rounded-lg border border-border p-4">
                        {!selectedPlayer ? (
                            <p>Select a player to view their stats.</p>
                        ) : (
                            <div className="flex flex-col gap-4">
                                <header className="flex items-center gap-3">
                                    <PlayerAvatar
                                        playerId={selectedPlayer.id}
                                        avatarImageUrl={
                                            selectedPlayer.avatarImageUrl
                                        }
                                        name={selectedPlayer.displayName}
                                    />
                                    <div>
                                        <h2 className="text-lg font-semibold">
                                            {selectedPlayer.displayName}
                                        </h2>
                                        <p className="text-sm text-muted-fg">
                                            {selectedPlayer.teamName ||
                                                selectedPlayer.displayName}{' '}
                                            · ${selectedPlayer.price.toFixed(1)}
                                            M
                                        </p>
                                    </div>
                                </header>

                                {playerStats && (
                                    <div>
                                        {
                                            playerStats.Value.TourWiseStats[0]
                                                .StatsWise[0].Value
                                        }
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};
