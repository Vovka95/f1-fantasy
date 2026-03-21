import type { PlayersHistoryItem } from '@/entities/player';
import type {
    FantasyTeamHistoryItem,
    FantasyTeamHistoryViewModel,
} from '../types';

import { mapFantasyTeamToView } from './fantasy-team-to-team-view.mapper';

export const mapFantasyTeamHistoryToView = (
    fantasyTeamHistory: FantasyTeamHistoryItem[],
    playersHistoryList: PlayersHistoryItem[],
): FantasyTeamHistoryViewModel[] => {
    const raceWeeks = Array.from(
        new Set([
            ...fantasyTeamHistory.map((item) => item.raceWeek),
            ...playersHistoryList.map((item) => item.raceWeek),
        ]),
    ).sort((a, b) => a - b);

    const data = raceWeeks.map((raceWeek) => {
        const fantasyTeam = fantasyTeamHistory.find(
            (item) => item.raceWeek === raceWeek,
        );

        const players = playersHistoryList.find(
            (item) => item.raceWeek === raceWeek,
        );

        const playersView = mapFantasyTeamToView(
            fantasyTeam?.team!,
            players?.players.preview!,
        );

        return {
            raceWeek,
            playersView,
        };
    });

    return data;
};
