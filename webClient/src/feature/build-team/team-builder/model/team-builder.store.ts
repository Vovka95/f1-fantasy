import { create } from 'zustand';

import type { PlayerPositionNameType, PlayerPreview } from '@/entities/player';

import { validateBuilder } from './team-builder.validation';

import { mapFormToGeneratedTeam } from './team-builder.mapper';
import type { TeamOwnerType } from '@/feature/team-owner-switch';
import {
    addPlayer,
    EMPTY_STATE,
    getUserState,
    removePlayer,
    updatePlayers,
} from './team-builder.store-helpers';

import type { GeneratedTeamFormState, GeneratedTeamModel } from '../../model';

export type UserGeneratedTeamsState = {
    form: GeneratedTeamFormState;
    teams: GeneratedTeamModel[];
};

export type GeneratedTeamBuilderStoreState = {
    byUserId: Record<string, UserGeneratedTeamsState>;

    setInitialBudget: (userId: TeamOwnerType, budget: number) => void;

    addDriver: (userId: TeamOwnerType, playerPreview: PlayerPreview) => void;
    removeDriver: (userId: TeamOwnerType, playerPreview: PlayerPreview) => void;

    addConstructor: (
        userId: TeamOwnerType,
        playerPreview: PlayerPreview,
    ) => void;
    removeConstructor: (
        userId: TeamOwnerType,
        playerPreview: PlayerPreview,
    ) => void;

    setCaptain: (userId: TeamOwnerType, playerId: string) => void;

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

        addDriver: (userId, playerPreview) => {
            set((state) => {
                return addPlayer(state, userId, playerPreview, 'drivers');
            });
        },
        removeDriver: (userId, playerPreview) => {
            set((state) => {
                return removePlayer(state, userId, playerPreview, 'drivers');
            });
        },

        addConstructor: (userId, playerPreview) => {
            set((state) => {
                return addPlayer(state, userId, playerPreview, 'constructors');
            });
        },
        removeConstructor: (userId, playerPreview) => {
            set((state) => {
                return removePlayer(
                    state,
                    userId,
                    playerPreview,
                    'constructors',
                );
            });
        },

        setCaptain: (userId, playerId) => {
            set((state) => {
                return updatePlayers(state, userId, playerId);
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
