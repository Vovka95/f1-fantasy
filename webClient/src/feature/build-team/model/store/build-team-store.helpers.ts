import type { FantasyTeamPlayer, TeamPlayer } from '@/entities/fantasy-team';
import type { PlayerPreview } from '@/entities/player';

import { type UserGeneratedTeamsState } from '../../model';

import type { GeneratedTeamBuilderStoreState } from './build-team.store';

export const EMPTY_STATE: UserGeneratedTeamsState = {
    form: {
        drivers: [],
        constructors: [],
        initialBudget: 0,
    },
    teams: [],
    fantasyUserTeam: null,
};

export const getUserState = (
    state: GeneratedTeamBuilderStoreState,
    userId: string,
): UserGeneratedTeamsState => {
    return state.byUserId[userId] ?? EMPTY_STATE;
};

export const generatePlayerRaceInfoDefaultValue = (
    id: string,
): FantasyTeamPlayer => {
    return {
        id,
        isfinal: 0,
        iscaptain: 0,
        ismgcaptain: 0,
        playerpostion: 0,
    };
};

export const addPlayerToList = (
    list: TeamPlayer[],
    playerPreview: PlayerPreview,
    max: number,
): TeamPlayer[] => {
    if (list.length >= max) return list;

    const exists = list.some((p) => p.preview.id === playerPreview.id);
    if (exists) return list;

    return [
        ...list,
        {
            preview: playerPreview,
            raceInfo: generatePlayerRaceInfoDefaultValue(playerPreview.id),
        },
    ];
};

export const removePlayerFromList = (
    list: TeamPlayer[],
    playerId: string,
): TeamPlayer[] => {
    if (list.length === 0) return list;

    return list.filter((d) => d.preview.id !== playerId);
};

export const updatePlayerList = (
    list: TeamPlayer[],
    playerId: string,
): TeamPlayer[] => {
    return list.map((p) => ({
        ...p,
        raceInfo: {
            ...p.raceInfo,
            iscaptain: p.preview.id === playerId ? 1 : 0,
        },
    }));
};
