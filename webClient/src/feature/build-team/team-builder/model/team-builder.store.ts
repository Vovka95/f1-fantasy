import { create } from 'zustand';

import type { PlayerPosition, PlayerPreview } from '@/entities/player';
import type { TeamPlayer } from '@/entities/fantasy-team';
import type { FantasyTeamPlayer } from '@/entities/fantasy-team/api/fantasy-team-response.type';

import type {
    GeneratedTeam,
    GeneratedTeamFormState,
} from './team-builder.types';

import {
    MAX_CONSTRUCTORS,
    MAX_DRIVERS,
    validateBuilder,
} from './team-builder.validation';

import { mapFormToGeneratedTeam } from './team-builder.mapper';

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

    selectedPositionType: PlayerPosition;
    setSelectedPositionType: (selectedPositionType: PlayerPosition) => void;
};

const EMPTY_STATE: UserGeneratedTeamsState = {
    form: {
        drivers: [],
        constructors: [],
    },
    teams: [],
};

const getUserState = (
    state: GeneratedTeamBuilderStoreState,
    userId: string,
): UserGeneratedTeamsState => {
    return state.byUserId[userId] ?? EMPTY_STATE;
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

const removePlayerFromList = (
    list: TeamPlayer[],
    playerId: string,
): TeamPlayer[] => {
    if (list.length === 0) return list;

    return list.filter((d) => d.preview.id !== playerId);
};

const updatePlayerList = (
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
                        ...EMPTY_STATE,
                    },
                },
            }));
        },

        createTeamFromForm: (userId) => {
            set((state) => {
                const userState = getUserState(state, userId);

                const { isValid } = validateBuilder(userState.form);

                if (!isValid) {
                    return {
                        byUserId: {
                            ...state.byUserId,
                        },
                    };
                }

                const newTeam = mapFormToGeneratedTeam(userState.form);

                return {
                    byUserId: {
                        ...state.byUserId,
                        [userId]: {
                            ...userState,
                            teams: [...userState.teams, newTeam],
                            form: { ...EMPTY_STATE.form },
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

        selectedPositionType: 'DRIVER',
        setSelectedPositionType: (v) => set({ selectedPositionType: v }),
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
