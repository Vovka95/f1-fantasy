import { create } from 'zustand';

import type { PlayerPositionNameType, PlayerPreview } from '@/entities/player';
import type { TeamPlayer } from '@/entities/fantasy-team';
import type { TeamOwnerType } from '@/feature/team-owner-switch';

import {
    EMPTY_STATE,
    getUserState,
    addPlayerToList,
    removePlayerFromList,
    updatePlayerList,
} from './build-team-store.helpers';

import type { UserGeneratedTeamsState } from '../types';
import { mapFormToGeneratedTeam } from '../mappers';
import { validateBuilder } from '../validations';
import { MAX_CONSTRUCTORS, MAX_DRIVERS } from '../constants';

export type GeneratedTeamBuilderStoreState = {
    byUserId: Record<string, UserGeneratedTeamsState>;

    setInitialBudget: (userId: TeamOwnerType, budget: number) => void;

    addPlayer: (userId: TeamOwnerType, playerPreview: PlayerPreview) => void;
    removePlayer: (userId: TeamOwnerType, player: TeamPlayer) => void;

    setCaptain: (userId: TeamOwnerType, player: TeamPlayer) => void;

    resetForm: (userId: TeamOwnerType) => void;

    createTeamFromForm: (userId: TeamOwnerType) => void;
    removeTeam: (userId: TeamOwnerType, teamId: string) => void;

    selectedPositionType: PlayerPositionNameType;
    setSelectedPositionType: (
        selectedPositionType: PlayerPositionNameType,
    ) => void;
};

export const useGeneratedTeamBuilderStore =
    create<GeneratedTeamBuilderStoreState>((set) => ({
        byUserId: {},

        setInitialBudget: (userId, budget) => {
            set((state) => {
                const userState = getUserState(state, userId);

                if (userState.form.initialBudget > 0) {
                    return state;
                }

                return {
                    byUserId: {
                        ...state.byUserId,
                        [userId]: {
                            ...userState,
                            form: {
                                ...userState.form,
                                initialBudget: budget,
                            },
                        },
                    },
                };
            });
        },

        addPlayer: (userId, playerPreview) => {
            set((state) => {
                const userState = getUserState(state, userId);
                const maxPlayers =
                    playerPreview.positionName === 'DRIVER'
                        ? MAX_DRIVERS
                        : MAX_CONSTRUCTORS;

                const playerType =
                    playerPreview.positionName === 'DRIVER'
                        ? 'drivers'
                        : 'constructors';

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
            });
        },

        removePlayer: (userId, player) => {
            set((state) => {
                const userState = getUserState(state, userId);

                const playerType =
                    player.preview.positionName === 'DRIVER'
                        ? 'drivers'
                        : 'constructors';

                const updatedPlayerList = removePlayerFromList(
                    userState.form[playerType],
                    player.preview.id,
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
            });
        },

        setCaptain: (userId, player) => {
            set((state) => {
                const userState = getUserState(state, userId);

                const isConstructor = userState.form.constructors.some(
                    (d) => d.preview.id === player.preview.id,
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
                                drivers: updatePlayerList(
                                    userState.form.drivers,
                                    player.preview.id,
                                ),
                            },
                        },
                    },
                };
            });
        },

        resetForm: (userId) => {
            set((state) => {
                const userState = getUserState(state, userId);

                return {
                    byUserId: {
                        ...state.byUserId,
                        [userId]: {
                            ...userState,
                            form: {
                                ...EMPTY_STATE.form,
                                initialBudget: userState.form.initialBudget,
                            },
                        },
                    },
                };
            });
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
                            form: {
                                ...EMPTY_STATE.form,
                                initialBudget: userState.form.initialBudget,
                            },
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
