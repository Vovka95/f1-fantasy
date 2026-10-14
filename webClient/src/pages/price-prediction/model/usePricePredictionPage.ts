import { useMemo, useState } from 'react';

import type { PlayersEntityType } from '@/feature/players-entity-type-switch';
import { usePlayersQuery, type Player } from '@/entities/player';
import { usePlayerStatsQuery } from '@/entities/player-stats';
import { useActiveRaceWeek } from '@/entities/game-days';

export const usePricePredictionPage = () => {
    const [filterBy, setFilterBy] = useState<PlayersEntityType>('DRIVER');
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

    const { activeRaceWeekId } = useActiveRaceWeek();

    const playerStatsQuery = usePlayerStatsQuery({
        playerId: selectedPlayer?.id,
    });

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

    return {
        filterBy,
        setFilterBy,

        players,

        selectedPlayer,
        setSelectedPlayer,

        playerStats: playerStatsQuery.data,
    };
};
