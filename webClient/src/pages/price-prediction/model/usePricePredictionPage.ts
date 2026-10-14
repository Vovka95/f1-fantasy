import { useMemo, useState } from 'react';

import type { PlayersEntityType } from '@/feature/players-entity-type-switch';
import { usePlayersQuery, type Player } from '@/entities/player';
import { useActiveRaceWeek } from '@/entities/game-days';

export const usePricePredictionPage = () => {
    const [filterBy, setFilterBy] = useState<PlayersEntityType>('DRIVER');
    const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);

    const togglePlayer = (player: Player) => {
        setSelectedPlayers((current) =>
            current.some((selected) => selected.id === player.id)
                ? current.filter((selected) => selected.id !== player.id)
                : [...current, player],
        );
    };

    const { activeRaceWeekId } = useActiveRaceWeek();

    const playersQuery = usePlayersQuery({
        raceWeek: activeRaceWeekId,
    });

    const players = useMemo(() => {
        return playersQuery.data
            ? playersQuery.data.table.filter(
                  (item) => item.positionName === filterBy,
              )
            : [];
    }, [playersQuery.data, filterBy]);

    const selectAllPlayers = () => {
        setSelectedPlayers((current) => {
            const selectedIds = new Set(current.map((player) => player.id));
            return [
                ...current,
                ...(playersQuery.data?.table ?? []).filter(
                    (player) => !selectedIds.has(player.id),
                ),
            ];
        });
    };

    const clearSelectedPlayers = () => setSelectedPlayers([]);
    const areAllPlayersSelected = (playersQuery.data?.table ?? []).every(
        (player) => selectedPlayers.some((selected) => selected.id === player.id),
    );

    return {
        filterBy,
        setFilterBy,

        players,

        selectedPlayers,
        togglePlayer,
        selectAllPlayers,
        areAllPlayersSelected,
        clearSelectedPlayers,
    };
};
