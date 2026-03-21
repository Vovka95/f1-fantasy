import type { PlayersListView } from './players-list-view.type';

export type PlayersHistoryItem = {
    raceWeek: number;
    players: PlayersListView;
};
