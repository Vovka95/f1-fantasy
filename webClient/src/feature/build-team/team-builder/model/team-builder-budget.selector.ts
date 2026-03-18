import type { TeamOwnerType } from '@/feature/team-owner-switch';
import type { GeneratedTeamBuilderStoreState } from './team-builder.store';
import type { GeneratedTeamFormState } from './team-builder.types';
import { getUserGeneratedTeamForm } from './team-builder.selectors';

const toInternal = (value: number) => Math.round(value * 10);
const fromInternal = (value: number) => value / 10;

export const getSpentBudget = (form: GeneratedTeamFormState) => {
    const total = [...form.drivers, ...form.constructors].reduce(
        (sum, player) => sum + toInternal(player.preview.value),
        0,
    );

    return fromInternal(total);
};

export const getRemainingBudget = (form: GeneratedTeamFormState) => {
    const initial = toInternal(form.initialBudget);
    const spent = [...form.drivers, ...form.constructors].reduce(
        (sum, player) => sum + toInternal(player.preview.value),
        0,
    );

    return fromInternal(initial - spent);
};

export const getUserRemainingBudget = (
    state: GeneratedTeamBuilderStoreState,
    userId: TeamOwnerType,
) => {
    const form = getUserGeneratedTeamForm(state, userId);

    return getRemainingBudget(form);
};
