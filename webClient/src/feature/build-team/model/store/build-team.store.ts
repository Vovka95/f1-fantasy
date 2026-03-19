import { create } from 'zustand';

import type { PlayerPositionNameType, PlayerPreview } from '@/entities/player';
import type { FantasyUserTeam, TeamPlayer } from '@/entities/fantasy-team';
import type { TeamOwnerType } from '@/feature/team-owner-switch';

import {
    EMPTY_STATE,
    getUserState,
    addPlayerToList,
    removePlayerFromList,
    updatePlayerList,
} from './build-team-store.helpers';

import type { UserGeneratedTeamsState } from '../types';

import { validateBuilder } from '../validations';
import { MAX_CONSTRUCTORS, MAX_DRIVERS } from '../constants';
import {
    mapBuildTeamFormState,
    mapFantasyTeamToView,
    mapFormStateToView,
} from '../mappers';

export type GeneratedTeamBuilderStoreState = {
    byUserId: Record<string, UserGeneratedTeamsState>;

    setInitialBudget: (userId: TeamOwnerType, budget: number) => void;

    setFantasyUserTeam: (
        userId: TeamOwnerType,
        fantasyTeam: FantasyUserTeam,
        playersPreview: PlayerPreview[],
    ) => void;

    addPlayer: (userId: TeamOwnerType, playerPreview: PlayerPreview) => void;
    removePlayer: (userId: TeamOwnerType, player: TeamPlayer) => void;

    setCaptain: (userId: TeamOwnerType, player: TeamPlayer) => void;

    resetForm: (userId: TeamOwnerType) => void;

    setFormFromTeam: (userId: TeamOwnerType, teamId: string) => void;

    saveTeamFromForm: (userId: TeamOwnerType) => void;
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

        setFantasyUserTeam: (userId, fantasyTeam, playersPreview) => {
            set((state) => {
                const userState = getUserState(state, userId);

                if (Boolean(userState.fantasyUserTeam)) {
                    return state;
                }

                const fantasyUserTeam = mapFantasyTeamToView({
                    fantasyTeam,
                    playersPreview,
                });

                return {
                    byUserId: {
                        ...state.byUserId,
                        [userId]: {
                            ...userState,
                            fantasyUserTeam: fantasyUserTeam,
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

        setFormFromTeam: (userId, teamId) => {
            set((state) => {
                const userState = getUserState(state, userId);

                const teamToEdit = userState.teams.find((t) => t.id === teamId);

                if (!teamToEdit) {
                    return { byUserId: state.byUserId };
                }

                const form = mapBuildTeamFormState(teamToEdit, userState.form);

                return {
                    byUserId: {
                        ...state.byUserId,
                        [userId]: {
                            ...userState,
                            form,
                        },
                    },
                };
            });
        },

        saveTeamFromForm: (userId) => {
            set((state) => {
                const userState = getUserState(state, userId);
                const { form } = userState;

                const { isValid } = validateBuilder(form);

                if (!isValid) {
                    return {
                        byUserId: state.byUserId,
                    };
                }

                const mappedTeam = mapFormStateToView(form);

                const teams = form.id
                    ? userState.teams.map((team) =>
                          team.id === form.id
                              ? {
                                    ...mappedTeam,
                                    id: form.id,
                                }
                              : team,
                      )
                    : [...userState.teams, mappedTeam];

                return {
                    byUserId: {
                        ...state.byUserId,
                        [userId]: {
                            ...userState,
                            teams,
                            form: {
                                ...EMPTY_STATE.form,
                                initialBudget: form.initialBudget,
                            },
                        },
                    },
                };
            });
        },

        removeTeam: (userId, teamId) => {
            set((state) => {
                const userState = getUserState(state, userId);
                const isEditingRemovedTeam = userState.form.id === teamId;

                return {
                    byUserId: {
                        ...state.byUserId,
                        [userId]: {
                            ...userState,
                            teams: userState.teams.filter(
                                (t) => t.id !== teamId,
                            ),
                            form: isEditingRemovedTeam
                                ? {
                                      ...EMPTY_STATE.form,
                                      initialBudget:
                                          userState.form.initialBudget,
                                  }
                                : userState.form,
                        },
                    },
                };
            });
        },

        selectedPositionType: 'DRIVER',
        setSelectedPositionType: (v) => set({ selectedPositionType: v }),
    }));
