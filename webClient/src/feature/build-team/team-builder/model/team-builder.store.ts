import { create } from 'zustand';
import { nanoid } from 'nanoid';

import type { PlayerPreview } from '@/entities/player';
import type {
    BuilderPlayer,
    GeneratedTeam,
    GeneratedTeamFormState,
} from './team-builder.types';

import { MAX_CONSTRUCTORS, MAX_DRIVERS } from './team-builder.validation';
import type { FantasyTeamPlayer } from '@/entities/fantasy-team/api/fantasy-team-response.type';

type UserGeneratedTeamsState = {
    form: GeneratedTeamFormState;
    teams: GeneratedTeam[];
};

type GeneratedTeamBuilderStoreState = {
    byUserId: Record<string, UserGeneratedTeamsState>;

    addDriver: (userId: string, playerPreview: PlayerPreview) => void;
    removeDriver: (userId: string, playerId: string) => void;

    addConstructor: (userId: string, playerPreview: PlayerPreview) => void;
    removeConstructor: (userId: string, playerId: string) => void;

    setCaptain: (userId: string, playerId: string) => void;

    resetForm: (userId: string) => void;

    createTeamFromForm: (userId: string) => void;
    removeTeam: (userId: string, teamId: string) => void;
};

const createEmptyState = (): UserGeneratedTeamsState => ({
    form: {
        drivers: [],
        constructors: [],
    },
    teams: [],
});

const getUserState = (
    state: GeneratedTeamBuilderStoreState,
    userId: string,
): UserGeneratedTeamsState => {
    return state.byUserId[userId] ?? createEmptyState();
};

const generatePlayerRaceInfoDefaultValue = (id: string): FantasyTeamPlayer => {
    return {
        id,
        isfinal: 0,
        iscaptain: 0,
        ismgcaptain: 0,
        playerpostion: 0,
    };
};

const addPlayerToList = (
    list: BuilderPlayer[],
    playerPreview: PlayerPreview,
    max: number,
): BuilderPlayer[] => {
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

const removePlayerFromList = (
    list: BuilderPlayer[],
    playerId: string,
): BuilderPlayer[] => {
    if (list.length === 0) return list;

    return list.filter((d) => d.preview.id !== playerId);
};

const updatePlayerList = (
    list: BuilderPlayer[],
    playerId: string,
): BuilderPlayer[] => {
    return list.map((p) => ({
        ...p,
        raceInfo: {
            ...p.raceInfo,
            iscaptain: p.preview.id === playerId ? 1 : 0,
        },
    }));
};

const addPlayer = (
    state: GeneratedTeamBuilderStoreState,
    userId: string,
    playerPreview: PlayerPreview,
    playerType: 'drivers' | 'constructors',
) => {
    const userState = getUserState(state, userId);
    const maxPlayers =
        playerType === 'drivers' ? MAX_DRIVERS : MAX_CONSTRUCTORS;

    return {
        byUserId: {
            ...state.byUserId,
            [userId]: {
                ...userState,
                form: {
                    ...userState.form,
                    [playerType]: addPlayerToList(
                        userState.form[playerType],
                        playerPreview,
                        maxPlayers,
                    ),
                },
            },
        },
    };
};

const removePlayer = (
    state: GeneratedTeamBuilderStoreState,
    userId: string,
    playerId: string,
    playerType: 'drivers' | 'constructors',
) => {
    const userState = getUserState(state, userId);

    return {
        byUserId: {
            ...state.byUserId,
            [userId]: {
                ...userState,
                form: {
                    ...userState.form,
                    [playerType]: removePlayerFromList(
                        userState.form[playerType],
                        playerId,
                    ),
                },
            },
        },
    };
};

const updatePlayers = (
    state: GeneratedTeamBuilderStoreState,
    userId: string,
    playerId: string,
) => {
    const userState = getUserState(state, userId);

    const isConstructor = userState.form.constructors.some(
        (d) => d.preview.id === playerId,
    );

    if (!isConstructor) {
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

export const useGeneratedTeamBuilderStore =
    create<GeneratedTeamBuilderStoreState>((set) => ({
        byUserId: {},

        addDriver: (userId, playerPreview) => {
            set((state) => {
                return addPlayer(state, userId, playerPreview, 'drivers');
            });
        },
        removeDriver: (userId, playerId) => {
            set((state) => {
                return removePlayer(state, userId, playerId, 'drivers');
            });
        },

        addConstructor: (userId, playerPreview) => {
            set((state) => {
                return addPlayer(state, userId, playerPreview, 'constructors');
            });
        },
        removeConstructor: (userId, playerId) => {
            set((state) => {
                return removePlayer(state, userId, playerId, 'constructors');
            });
        },

        setCaptain: (userId, playerId) => {
            set((state) => {
                return updatePlayers(state, userId, playerId);
            });
        },

        resetForm: (userId) => {
            set((state) => ({
                byUserId: {
                    ...state.byUserId,
                    [userId]: {
                        ...createEmptyState(),
                    },
                },
            }));
        },

        createTeamFromForm: (userId) => {
            set((state) => {
                const userState = getUserState(state, userId);

                const newTeam: GeneratedTeam = {
                    id: nanoid(),
                    drivers: userState.form.drivers,
                    constructors: userState.form.constructors,
                    createdAt: Date.now(),
                };

                return {
                    byUserId: {
                        ...state.byUserId,
                        [userId]: {
                            ...userState,
                            teams: [...userState.teams, newTeam],
                            form: createEmptyState().form,
                        },
                    },
                };
            });
        },

        removeTeam: (userId, teamId) => {
            set((state) => {
                const userState = getUserState(state, userId);

                return {
                    byUserId: {
                        ...state.byUserId,
                        [userId]: {
                            ...userState,
                            teams: userState.teams.filter(
                                (t) => t.id !== teamId,
                            ),
                        },
                    },
                };
            });
        },
    }));

export const getUserGeneratedTeamForm = (
    state: GeneratedTeamBuilderStoreState,
    userId: string,
): GeneratedTeamFormState => {
    return getUserState(state, userId).form;
};

export const getUserGeneratedTeams = (
    state: GeneratedTeamBuilderStoreState,
    userId: string,
): GeneratedTeam[] => {
    return getUserState(state, userId).teams;
};
