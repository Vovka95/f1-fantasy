import { type GeneratedTeamBuilderStoreState } from './team-builder.store';
import type { TeamOwnerType } from '@/feature/team-owner-switch';

import type {
    GeneratedTeam,
    GeneratedTeamFormState,
} from './team-builder.types';
import { getUserState } from './team-builder.store-helpers';

export const getUserGeneratedTeamForm = (
    state: GeneratedTeamBuilderStoreState,
    userId: TeamOwnerType,
): GeneratedTeamFormState => {
    return getUserState(state, userId).form;
};

export const getUserGeneratedTeams = (
    state: GeneratedTeamBuilderStoreState,
    userId: TeamOwnerType,
): GeneratedTeam[] => {
    return getUserState(state, userId).teams;
};

export const getUserSelectedPlayerIds = (
    state: GeneratedTeamBuilderStoreState,
    userId: TeamOwnerType,
) => {
    const form = getUserGeneratedTeamForm(state, userId);

    return [
        ...form.drivers.map((p) => p.preview.id),
        ...form.constructors.map((p) => p.preview.id),
    ];
};
