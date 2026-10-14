import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui';

import { PlayerAvatar } from '@/entities/player';
import { PlayersEntityTypeSwitch } from '@/feature/players-entity-type-switch';

import { usePricePredictionPage } from '../model/usePricePredictionPage';
import { PricePrediction } from '@/widgets/price-prediction';

export const PricePredictionPage = () => {
    const {
        filterBy,
        setFilterBy,
        players,
        selectedPlayers,
        togglePlayer,
        selectAllPlayers,
        areAllPlayersSelected,
        clearSelectedPlayers,
    } = usePricePredictionPage();

    return (
        <div className="flex gap-4 w-full h-full min-h-0 justify-center">
            <div className="flex flex-col w-full h-full max-w-400 min-h-0 overflow-hidden gap-4">
                <header className="flex gap-2 justify-between">
                    <PlayersEntityTypeSwitch
                        value={filterBy}
                        onValueChange={setFilterBy}
                    />
                    <div className="flex gap-2">
                        <Button
                            variant="secondary"
                            onClick={selectAllPlayers}
                            disabled={areAllPlayersSelected}
                        >
                            Select all
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={clearSelectedPlayers}
                            disabled={selectedPlayers.length === 0}
                        >
                            Clear
                        </Button>
                    </div>
                </header>
                <section className="grid flex-1 min-h-0 grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-4">
                    <ul className="flex min-h-0 flex-col gap-3 overflow-y-auto">
                        {players.map((player) => (
                            <li key={player.id}>
                                <button
                                    type="button"
                                    aria-pressed={selectedPlayers.some(
                                        (selected) => selected.id === player.id,
                                    )}
                                    onClick={() => togglePlayer(player)}
                                    className={cn(
                                        'flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-primary',
                                        selectedPlayers.some(
                                            (selected) =>
                                                selected.id === player.id,
                                        )
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
                                            {player.teamName === '—'
                                                ? player.displayName
                                                : player.teamName}
                                        </p>
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                    <ul className="flex min-h-0 flex-col gap-3 overflow-y-auto">
                        {selectedPlayers.length === 0 && (
                            <li>Select players to view their stats.</li>
                        )}
                        {selectedPlayers.map((player) => (
                            <li key={player.id}>
                                <PricePrediction
                                    player={player}
                                    onRemove={() => togglePlayer(player)}
                                />
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    );
};
