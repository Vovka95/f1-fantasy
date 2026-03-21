import { qk } from '@/app/config/queryKey';

import { getPlayersList } from './players.api';
import { mapPlayers } from '../model';

export const getPlayersQueryOptions = (raceWeek?: number) => ({
    queryKey: qk.f1.playersList(raceWeek!),
    queryFn: () => getPlayersList(raceWeek!),
    select: (data: Awaited<ReturnType<typeof getPlayersList>>) =>
        mapPlayers(data.Data.Value),
    retry: false,
    enabled: Number.isFinite(raceWeek),
    staleTime: 60_000,
});
