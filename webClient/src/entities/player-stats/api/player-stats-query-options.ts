import { qk } from '@/app/config/queryKey';

import { getPlayerStats } from './player-stats.api';

export const getPlayerStatsQueryOptions = (playerId?: string) => ({
    queryKey: qk.f1.playerStats(playerId!),
    queryFn: () => getPlayerStats(playerId!),
    retry: false,
    enabled: !!playerId?.trim(),
    staleTime: 60_000,
});
