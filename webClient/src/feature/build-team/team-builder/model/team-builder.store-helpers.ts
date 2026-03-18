import type { FantasyTeamPlayer } from '@/entities/fantasy-team/api/fantasy-team-response.type';
import type { TeamPlayer } from '@/entities/fantasy-team';
import type { PlayerPreview } from '@/entities/player';

import type {
    GeneratedTeamBuilderStoreState,
    UserGeneratedTeamsState,
} from './team-builder.store';

import { MAX_CONSTRUCTORS, MAX_DRIVERS } from './team-builder.validation';

export const EMPTY_STATE: UserGeneratedTeamsState = {
    form: {
        drivers: [],
        constructors: [],
        initialBudget: 0,
    },
    teams: [],
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

export const addPlayer = (
    state: GeneratedTeamBuilderStoreState,
    userId: string,
    playerPreview: PlayerPreview,
    playerType: 'drivers' | 'constructors',
) => {
    const userState = getUserState(state, userId);
    const maxPlayers =
        playerType === 'drivers' ? MAX_DRIVERS : MAX_CONSTRUCTORS;

    const updatedPlayerList = addPlayerToList(
        userState.form[playerType],
        playerPreview,
        maxPlayers,
    );

    return {
        byUserId: {
            ...state.byUserId,
            [userId]: {
                ...userState,
                form: {
                    ...userState.form,
                    [playerType]: updatedPlayerList,
                },
            },
        },
    };
};

export const removePlayer = (
    state: GeneratedTeamBuilderStoreState,
    userId: string,
    playerPreview: PlayerPreview,
    playerType: 'drivers' | 'constructors',
) => {
    const userState = getUserState(state, userId);

    const updatedPlayerList = removePlayerFromList(
        userState.form[playerType],
        playerPreview.id,
    );

    return {
        byUserId: {
            ...state.byUserId,
            [userId]: {
                ...userState,
                form: {
                    ...userState.form,
                    [playerType]: updatedPlayerList,
                },
            },
        },
    };
};

export const updatePlayers = (
    state: GeneratedTeamBuilderStoreState,
    userId: string,
    playerId: string,
) => {
    const userState = getUserState(state, userId);

    const isConstructor = userState.form.constructors.some(
        (d) => d.preview.id === playerId,
    );

    if (isConstructor) {
        return state;
    }

    return {
        byUserId: {
            ...state.byUserId,
            [userId]: {
                ...userState,
                form: {
                    ...userState.form,
                    drivers: updatePlayerList(userState.form.drivers, playerId),
                },
            },
        },
    };
};
